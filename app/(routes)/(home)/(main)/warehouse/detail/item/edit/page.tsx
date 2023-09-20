'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { ApiError } from 'next/dist/server/api-utils'
import { toast } from 'react-hot-toast'

import Layout from '@/app/components/template/main/layout/Layout'
import InputField from '@/app/components/atom/InputField'
import Button from '@/app/components/atom/Button'
import TextArea from '@/app/components/atom/TextArea'
import SelectBox from '@/app/components/atom/SelectBox'
// import MultiSelectBox from '@/app/components/atom/MultiSelectBox'
import InputFile from '@/app/components/atom/InputFile'
import { CRUD } from '@/app/libs/client/constants/code'
import { OmitStorageIdItemInfo } from '@/app/apis/types/domain/warehouse/warehouse'
import { ITEM, WAREHOUSE } from '@/app/libs/client/reactQuery/queryKey/warehouse'
import { CATEGORIES, DEAL_TYPES, STORAGES } from '@/app/libs/client/constants/static'
import { CHAT } from '@/app/libs/client/reactQuery/queryKey/chat'

import { itemInfo, saveItem, modifyItem, storage as _storage } from '@/app/apis/domain/warehouse/warehouse'
import { openGroupChat } from '@/app/apis/domain/chat/channel'

interface ItemProps {
  name: string
  groupName?: string
  limit?: number
  description: string
  imgUrl: string
  itemType: string
  category: string
  storageId: number
}

const EditItem = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = useQueryClient()
  const [selectedCategory, setSelectedCategory] = useState<{ label?: string; name: string }>(CATEGORIES[0])
  const [selectedStorage, setSelectedStorage] = useState<{ label?: string; name: string }>(STORAGES[0])
  const [selectedType, setSelectedType] = useState<{ label?: string; name: string }>(DEAL_TYPES[0])
  const [imageFile, setImageFile] = useState<FileList | null>(null)
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined)

  const REGION = process.env.NEXT_PUBLIC_AWS_REGION
  const ACCESS_KEY_ID = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID
  const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY

  const crud = searchParams.get('crud')
  const storage = searchParams.get('storage')
  const seq = searchParams.get('seq')
  const isEditMode = (crud === CRUD.수정 && seq !== '' && storage !== '') || false

  // const storageIds = selectedStorage.map(value => value.id)

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ItemProps>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      imgUrl: undefined,
    },
  })

  // 창고 조회
  // const { data: { data: _storageInfo } = {} } = useQuery([WAREHOUSE.조회], () => _storage(), {
  //   enabled: isEditMode,
  // })
  // const { result } = _storageInfo || {}

  // [편집모드] 창고 ID 최신화
  // const updatedStorageIds = STORAGES.map(storage => {
  //   if (!result) return
  //
  //   return result.map(v => {
  //     return { ...storage, id: v.storageId }.id
  //   })
  // }).find(value => value)

  // 아이템 상세조회
  const { data: { data: _itemInfo } = {} } = useQuery([ITEM.상세, seq], () => itemInfo(seq), {
    enabled: isEditMode,
  })
  console.log('_itemInfo:', _itemInfo)

  // 그룹 채팅방 개설
  const { mutate: mutateOpenGroup } = useMutation(openGroupChat, {
    onSuccess: () => {
      query.invalidateQueries([CHAT.조회])
      toast.success('그룹 채팅방이 개설되었습니다.')
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // 아이템 등록
  const { mutate: mutateSave } = useMutation(saveItem, {
    onSuccess: data => {
      if (selectedType.name === 'GROUP_BUY') {
        mutateOpenGroup({
          itemId: data.data.result.id,
          defaultTitle: getValues('groupName')!,
          limit: getValues('limit')!,
        })
      }
      query.invalidateQueries([WAREHOUSE.조회])
      query.invalidateQueries([ITEM.조회])
      toast.success('아이템이 등록되었습니다.')
      router.push(`/warehouse/detail/edit?seq=${storage}`)
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // 아이템 창고 수정
  // const { mutate: mutateStorage } = useMutation(modifyStorageItem, {
  //   onError: (error: ApiError) => {
  //     toast.error(error.message)
  //   },
  // })

  // 아이템 수정
  const { mutate: mutateModify } = useMutation((params: OmitStorageIdItemInfo) => modifyItem(seq!, params), {
    onSuccess: () => {
      // mutateStorage({ itemId: edit, storageIdList: updatedStorageIds })
      query.invalidateQueries([WAREHOUSE.조회])
      query.invalidateQueries([ITEM.조회])
      query.invalidateQueries([ITEM.상세])
      toast.success('아이템이 수정되었습니다.')
      router.replace(`/warehouse/detail/edit?seq=${seq}`)
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // S3 업로드
  const uploadS3 = async (file: File) => {
    const s3Client = new S3Client({
      region: REGION,
      credentials: {
        accessKeyId: ACCESS_KEY_ID!,
        secretAccessKey: SECRET_ACCESS_KEY!,
      },
    })

    try {
      const command = new PutObjectCommand({
        Bucket: 'naejango-s3-image',
        Key: `upload/item/${file.name}`,
        ContentType: file.type,
        Body: file,
        ACL: 'public-read',
      })
      return await s3Client.send(command)
    } catch (error: unknown) {
      console.error('S3 업로드 에러:', error)
    }
  }

  // 이미지 제한
  let imgSizeConverted = ''
  const limitedFileSize = (file: File) => {
    const imgSize = file.size
    const maxSize = 1024 * 1024 // 1MB

    if (imgSize >= maxSize) {
      toast.error('이미지 용량은 1MB 이내로 등록 가능합니다.')
      return false
    }

    if (imgSize < maxSize) {
      if (imgSize < 1024) {
        imgSizeConverted = imgSize + 'bytes'
      } else if (imgSize >= 1024 && imgSize < 1048576) {
        imgSizeConverted = (imgSize / 1024).toFixed(1) + 'KB'
      } else if (imgSize >= 1048576) {
        imgSizeConverted = (imgSize / 1048576).toFixed(1) + 'MB'
      }
    }
    return true
  }

  // 업로드 예외처리
  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0]
    const fileExt = file?.name.split('.').pop()

    if (!file) return
    if (!['jpeg', 'png', 'jpg', 'JPG', 'PNG', 'JPEG'].includes(fileExt!)) {
      toast.error('jpg, png, jpg 파일만 업로드가 가능합니다.')
      event.target.value = ''
      return
    }

    if (!limitedFileSize(file)) {
      event.target.value = ''
      return
    }

    const reader = new FileReader()
    reader.addEventListener('load', () => {
      setImagePreview(reader.result as string)
      setImageFile(event.target.files)

      URL.revokeObjectURL(reader.result as string)
    })
    reader.readAsDataURL(file)
  }

  const onSubmit = async (data: ItemProps) => {
    // if (!_itemInfo) return

    if (!imagePreview) return toast.error('이미지를 등록해주세요.')
    if (selectedCategory.name === '전체') return toast.error('다른 카테고리를 선택해주세요.')
    if (selectedStorage.name?.length === 0) return toast.error('창고를 선택해주세요.')

    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0]
      await uploadS3(file)
    }

    const params: ItemProps = {
      name: data.name,
      description: data.description,
      imgUrl: (imageFile! && imageFile[0].name) ?? _itemInfo?.result.imgUrl,
      itemType: selectedType.name,
      category: selectedCategory.name,
      storageId: Number(selectedStorage.name),
    }

    const editParameters = () => {
      const { storageId, ...newParams } = params
      return { ...newParams, id: Number(seq) }
    }

    isEditMode ? mutateModify(editParameters()) : mutateSave(params)
  }

  // 선택된 창고
  // const getSelectedStorages = () => {
  //   let storages: { label: string; name: string }[] = []
  //
  //   result &&
  //     result.flatMap((_, idx) => {
  //       return storages.push(STORAGES[idx])
  //     })
  //   return storages
  // }

  useEffect(() => {
    reset({ ..._itemInfo?.result })
    if (isEditMode) {
      query.invalidateQueries([ITEM.상세])
    }
  }, [_itemInfo, isEditMode])

  useEffect(() => {
    setSelectedStorage(STORAGES[Number(storage) - 1])
  }, [])

  useEffect(() => {
    if (_itemInfo) {
      setValue('imgUrl', _itemInfo.result.imgUrl)
      setImagePreview(_itemInfo.result.imgUrl)
      setSelectedCategory({ name: _itemInfo.result.category })
      setSelectedType({
        label: DEAL_TYPES.find(v => v.name === _itemInfo?.result.itemType)!.label,
        name: _itemInfo?.result.itemType,
      })
      setSelectedStorage({ label: STORAGES[Number(_itemInfo.result.id - 1)].label, name: String(_itemInfo.result.id) })
    }
  }, [_itemInfo])

  return (
    <Layout canGoBack title={`아이템 ${isEditMode ? '편집' : '등록'}`}>
      <form className='mt-12 space-y-4 p-2' onSubmit={handleSubmit(onSubmit)}>
        <div className={'relative h-full w-full'}>
          <InputFile
            id='file'
            dotted
            styleOption={
              'flex h-48 w-full items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-gray-600 hover:border-[#32D7A0] hover:text-[#32D7A0]'
            }
            {...register('imgUrl')}
            onChange={event => onUpload(event)}
          />
          {imageFile ? (
            <Image
              src={URL.createObjectURL(imageFile[0])}
              defaultValue={imagePreview}
              width={'100'}
              height={'100'}
              alt='이미지 미리보기'
              className={'absolute left-0 top-0 -z-10 h-48 w-full object-cover'}
            />
          ) : _itemInfo?.result.imgUrl === (undefined || '') ? (
            <Image
              src={'https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/assets/bg-white.png'}
              width={'100'}
              height={'100'}
              alt='아이템 이미지'
              className={'absolute left-0 top-0 -z-10 h-48 w-full object-cover'}
            />
          ) : (
            <Image
              src={`https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/upload/item/${encodeURIComponent(
                _itemInfo?.result.imgUrl as string
              )}`}
              width={'100'}
              height={'100'}
              alt='아이템 이미지'
              className={'absolute left-0 top-0 -z-10 h-48 w-full object-cover'}
            />
          )}
        </div>
        <SelectBox
          title={'카테고리'}
          data={CATEGORIES}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
          essential
        />
        <InputField
          type='text'
          register={register('name', { required: '상품명을 입력해주세요.' })}
          label='상품명'
          placeholder='상품명'
          essential
        />
        <p className='!mt-1.5 text-xs text-red-400'>{errors.name?.message}</p>
        <TextArea
          register={register('description', { required: '상품설명을 입력해주세요.' })}
          label='상품설명'
          placeholder='상품설명'
          essential
        />
        <p className='!mt-0 text-xs text-red-400'>{errors.description?.message}</p>
        {/* <MultiSelectBox */}
        {/*  title={'창고선택'} */}
        {/*  data={STORAGES.filter(storage => storage.id <= (result?.length || 0))} */}
        {/*  selected={selectedStorage} */}
        {/*  setSelected={setSelectedStorage} */}
        {/*  essential */}
        {/* /> */}
        <SelectBox title={'저장창고'} data={[]} selected={selectedStorage} setSelected={setSelectedStorage} essential />
        <SelectBox title={'분류'} data={DEAL_TYPES} selected={selectedType} setSelected={setSelectedType} essential />
        {selectedType.label === '공동 구매' && (
          <>
            <InputField
              type='text'
              register={register('groupName', { required: '그룹채팅 제목을 입력해주세요.' })}
              label='그룹 제목'
              placeholder='그룹 제목'
              essential
            />
            <p className='!mt-1.5 text-xs text-red-400'>{errors.groupName?.message}</p>
            <InputField
              type='number'
              label='제한 인원'
              essential
              register={register('limit', {
                required: '제한 인원을 입력해주세요.',
                value: 2,
                validate: {
                  checkLimit: value => {
                    if (!value) return

                    if (value < 2) {
                      return '제한 인원이 최소 2명 이상입니다.'
                    }
                    if (value > 6) {
                      return '제한 인원이 최대 6명 이하입니다.'
                    }
                  },
                },
              })}
              className={'!w-[48px] text-center'}
            />
            <p className='!mt-1.5 text-xs text-red-400'>{errors.limit?.message}</p>
          </>
        )}
        <Button type={'submit'} text={`${isEditMode ? '수정' : '등록'}`} />
      </form>
    </Layout>
  )
}

export default EditItem
