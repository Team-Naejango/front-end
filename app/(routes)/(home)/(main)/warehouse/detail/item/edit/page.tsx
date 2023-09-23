'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { ApiError } from 'next/dist/server/api-utils'
import { toast } from 'react-hot-toast'
import { BsPlusSquare } from 'react-icons/bs'

import Layout from '@/app/components/template/main/layout/Layout'
import InputField from '@/app/components/atom/InputField'
import Button from '@/app/components/atom/Button'
import TextArea from '@/app/components/atom/TextArea'
import SelectBox from '@/app/components/atom/SelectBox'
import InputFile from '@/app/components/atom/InputFile'
import { CRUD, ITEM_TYPE } from '@/app/libs/client/constants/code'
import { ITEM, WAREHOUSE } from '@/app/libs/client/reactQuery/queryKey/warehouse'
import { CATEGORIES, DEAL_TYPES, STORAGES } from '@/app/libs/client/constants/static'
import { CHAT } from '@/app/libs/client/reactQuery/queryKey/chat'

import {
  itemInfo,
  saveItem,
  modifyItem,
  storage as _storage,
  OmitStorageIdItemParam,
  storageGroupChannel,
} from '@/app/apis/domain/warehouse/warehouse'
import { openGroupChat } from '@/app/apis/domain/chat/channel'

interface ItemProps {
  name: string
  groupName?: string
  limit?: number
  description: string
  imgUrl: string
  itemType: string
  hashTag: string[]
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
  const [hashTags, setHashTags] = useState<string[]>([])

  const REGION = process.env.NEXT_PUBLIC_AWS_REGION
  const ACCESS_KEY_ID = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID
  const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY

  const crud = searchParams.get('crud')
  const storageId = searchParams.get('storage')
  const count = searchParams.get('count')
  const itemId = searchParams.get('item')

  const isEditMode = (crud === CRUD.수정 && itemId !== '' && storageId !== '') || false

  // const storageIds = selectedStorage.map(value => value.id)

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    setError,
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
  // }).find(v => v)

  // 아이템 상세조회
  const { data: { data: _itemInfo } = {} } = useQuery([ITEM.상세, itemId], () => itemInfo(itemId), {
    enabled: isEditMode,
  })

  // 창고 아이템 그룹 채널 조회
  const { data: { data: groupChat } = {} } = useQuery(
    [WAREHOUSE.그룹채널조회, itemId],
    () => storageGroupChannel(itemId!),
    {
      enabled: !!itemId,
    }
  )

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
      if (selectedType.name === ITEM_TYPE.공동구매) {
        mutateOpenGroup({
          itemId: data.data.result.id,
          defaultTitle: getValues('groupName')!,
          limit: getValues('limit')!,
        })
      }
      query.invalidateQueries([WAREHOUSE.조회])
      query.invalidateQueries([ITEM.조회])
      toast.success('아이템이 등록되었습니다.')
      router.push(`/warehouse/detail/edit?seq=${storageId}`)
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
  const { mutate: mutateModify } = useMutation((params: OmitStorageIdItemParam) => modifyItem(itemId!, params), {
    onSuccess: () => {
      // mutateStorage({ itemId: edit, storageIdList: updatedStorageIds })
      query.invalidateQueries([WAREHOUSE.조회])
      query.invalidateQueries([ITEM.조회])
      query.invalidateQueries([ITEM.상세])
      toast.success('아이템이 수정되었습니다.')
      router.replace(`/warehouse/detail/edit?seq=${itemId}`)
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
    if (hashTags.length === 0) return setError('hashTag', { message: '해시태그를 추가해주세요.' })

    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0]
      await uploadS3(file)
    }

    const params: ItemProps = {
      name: data.name,
      description: data.description,
      imgUrl: (imageFile! && imageFile[0].name) ?? _itemInfo?.result.imgUrl,
      itemType: selectedType.name,
      hashTag: hashTags,
      category: selectedCategory.name,
      storageId: Number(selectedStorage.name),
    }

    const editParameters = () => {
      const { storageId, hashTag, groupName, limit, ...newParams } = params
      return { ...newParams }
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
    reset({
      ..._itemInfo?.result,
      groupName: groupChat?.result?.defaultTitle ?? '',
      limit: groupChat?.result?.channelLimit ?? 2,
    })
    if (isEditMode) {
      query.invalidateQueries([ITEM.상세])
    }
  }, [_itemInfo, groupChat, isEditMode])

  useEffect(() => {
    setSelectedStorage(STORAGES[Number(storageId) - 1])
  }, [])

  useEffect(() => {
    if (_itemInfo) {
      setValue('imgUrl', _itemInfo.result.imgUrl)
      setImagePreview(_itemInfo.result.imgUrl)
      setSelectedCategory({ name: _itemInfo.result.category })
      setSelectedStorage({ label: STORAGES[Number(count)].label, name: String(count) })
      setSelectedType({
        label: DEAL_TYPES.find(v => v.name === _itemInfo?.result.itemType)!.label,
        name: _itemInfo?.result.itemType,
      })
      setHashTags(_itemInfo.result.hashTag)
      setValue('hashTag', [])
    }
  }, [_itemInfo, groupChat])

  // 해시태그 추가
  const onAddHashTag = (hashTag: string[]) => {
    if (hashTag.length <= 0) return toast.error('해시태그를 입력해주세요.')
    if (hashTag.length > 10) return toast.error('최대 10글자 이하로 입력해주세요.')

    if (hashTags.length <= 2) {
      setHashTags(prevHashTag => [...prevHashTag, String(hashTag)])
      setValue('hashTag', [])
    } else {
      toast.error('해시태그는 최대 3개까지 가능합니다.')
    }
  }

  // 해시태그 삭제
  const onDeleteHashTag = (hashTag: string) => {
    setHashTags(prevHashTag => [...prevHashTag].filter(v => v !== hashTag))
  }

  return (
    <Layout canGoBack title={`아이템 ${isEditMode ? '편집' : '등록'}`}>
      <form className='mt-12 space-y-4 p-2' onSubmit={handleSubmit(onSubmit)}>
        <div className={'relative h-full w-full'}>
          <InputFile
            dotted
            id='file'
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
          ) : _itemInfo?.result.imgUrl === undefined ? (
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
          essential
          title={'카테고리'}
          data={CATEGORIES}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />
        <InputField
          essential
          type='text'
          label='상품명'
          placeholder='상품명'
          register={register('name', { required: '상품명을 입력해주세요.' })}
        />
        <p className='!mt-1.5 text-xs text-red-400'>{errors.name?.message}</p>
        <TextArea
          essential
          label='상품설명'
          placeholder='상품설명'
          register={register('description', { required: '상품설명을 입력해주세요.' })}
        />
        <p className='!mt-0 text-xs text-red-400'>{errors.description?.message}</p>
        <div className={'relative'}>
          <InputField
            essential
            type='text'
            label='해시태그'
            placeholder='해시태그는 최대 3개까지 추가할 수 있습니다.'
            register={register('hashTag', {
              validate: {
                checkLimit: hashTag => {
                  if (!hashTag) return

                  if (hashTag.length > 10) {
                    return '최대 10글자 이하로 입력해주세요.'
                  }
                },
              },
            })}
          />
          <BsPlusSquare
            className='absolute right-4 top-1/2 cursor-pointer text-xl text-[#222] hover:text-[#32D7A0]'
            onClick={() => onAddHashTag(watch('hashTag'))}
          />
        </div>
        <p className='!mt-1.5 text-xs text-red-400'>{errors.hashTag?.message}</p>
        <div className={'!mt-2.5 flex gap-2'}>
          {hashTags.map(hashTag => {
            return (
              <div key={hashTag} className={'flex items-center rounded-[20px] border py-1.5 pl-3 pr-1.5'}>
                <span className={'block truncate text-xs'}>{hashTag}</span>
                <span
                  role='presentation'
                  className='ml-2 flex cursor-pointer text-gray-500 hover:text-red-500 focus:outline-none'
                  onClick={() => onDeleteHashTag(hashTag)}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </span>
              </div>
            )
          })}
        </div>
        <SelectBox essential title={'저장창고'} data={[]} selected={selectedStorage} setSelected={setSelectedStorage} />
        <SelectBox essential title={'분류'} data={DEAL_TYPES} selected={selectedType} setSelected={setSelectedType} />
        {selectedType.label === '공동 구매' && (
          <>
            <InputField
              essential
              type='text'
              label='그룹 제목'
              placeholder='그룹 제목'
              register={register('groupName', {
                required: '그룹채팅 제목을 입력해주세요.',
              })}
            />
            <p className='!mt-1.5 text-xs text-red-400'>{errors.groupName?.message}</p>
            <InputField
              essential
              type='number'
              label='제한 인원'
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
