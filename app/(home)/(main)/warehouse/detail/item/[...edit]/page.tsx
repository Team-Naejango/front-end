'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ApiError } from 'next/dist/server/api-utils'
import { toast } from 'react-hot-toast'
import axios from 'axios'

import { CATEGORIES, KEEP_TYPES, STORAGES } from '@/app/libs/client/constants/warehouse'
import Layout from '@/app/components/template/main/layout/Layout'
import InputField from '@/app/components/atom/InputField'
import Button from '@/app/components/atom/Button'
import TextArea from '@/app/components/atom/TextArea'
import SelectBox from '@/app/components/atom/SelectBox'
import MultiSelectBox from '@/app/components/atom/MultiSelectBox'
import { CRUD } from '@/app/libs/client/constants/code'
import { ItemInfo, ItemParams, OmitStorageIdItemInfo } from '@/app/apis/types/domain/warehouse/warehouse'
import { ITEM, WAREHOUSE } from '@/app/libs/client/reactQuery/queryKey/warehouse'
import InputFile from '@/app/components/atom/InputFile'

import {
  itemInfo,
  saveItem,
  modifyItem,
  modifyStorage,
  ModifyStorageParam,
} from '@/app/apis/domain/warehouse/warehouse'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

interface ItemProps {
  name: string
  description: string
  imgUrl: string
  type: string
  category: string
  storageIdList: number[]
}

const EditItem = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = useQueryClient()
  const [selectedCategory, setSelectedCategory] = useState<{ name: string }>(CATEGORIES[0])
  const [selectedStorage, setSelectedStorage] = useState<{ id: number; name: string }[]>([STORAGES[0]])
  const [selectedType, setSelectedType] = useState<{ name: string }>(KEEP_TYPES[0])
  const [imageFile, setImageFile] = useState<FileList | null>(null)
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined)

  const REGION = process.env.NEXT_PUBLIC_AWS_REGION
  const ACCESS_KEY_ID = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID
  const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY

  const crud = searchParams.get('crud')
  const seq = searchParams.get('seq')
  const isEditMode = (crud === CRUD.수정 && seq !== '') || false

  const storageIds = selectedStorage.map(value => value.id)

  const {
    register,
    handleSubmit,
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

  // 아이템 조회
  const { data: { item: _itemInfo } = {} } = useQuery<{ item: ItemInfo }>([ITEM.상세], () => itemInfo(seq), {
    enabled: isEditMode,
  })

  // 아이템 등록
  const { mutate: mutateSave } = useMutation<{ item: ItemParams }, ApiError, ItemParams>(saveItem, {
    onSuccess: () => {
      query.invalidateQueries([ITEM.조회, WAREHOUSE.조회])
      toast.success('아이템이 등록되었습니다.')
      router.push(`/warehouse/detail/${seq}`)
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // 아이템 창고 수정
  const { mutate: mutateStorage } = useMutation<null, ApiError, ModifyStorageParam>(modifyStorage, {
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // 아이템 수정
  const { mutate: mutateModify } = useMutation<{ item: ItemInfo }, ApiError, OmitStorageIdItemInfo>(
    (params: OmitStorageIdItemInfo) => modifyItem(seq!, params),
    {
      onSuccess: () => {
        mutateStorage({ itemId: seq!, storageIdList: storageIds })
        query.invalidateQueries([ITEM.조회, WAREHOUSE.조회])
        toast.success('아이템이 수정되었습니다.')
        router.push(`/warehouse/detail/${seq}`)
      },
      onError: (error: ApiError) => {
        toast.error(error.message)
      },
    }
  )

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
      const response = await s3Client.send(command)
      console.log('업로드', response)
    } catch (error) {
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

  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('event.target.files:', event.target.files)
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
    if (!_itemInfo) return

    if (!setImagePreview) {
      toast.error('이미지를 등록해주세요.')
      return
    }

    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0]
      await uploadS3(file)
    }

    const params: ItemProps = {
      name: data.name,
      description: data.description,
      imgUrl: (imageFile! && imageFile[0].name) ?? _itemInfo.imgUrl,
      type: selectedType.name,
      category: selectedCategory.name,
      storageIdList: storageIds,
    }
    console.log('params:', params)

    const { storageIdList, ...newParams } = params
    const editParams = { ...newParams, id: Number(seq) }

    isEditMode ? mutateModify(editParams) : mutateSave(params)
  }

  /** **** TEST API CALL ***** */
  // const accessToken = getCookie(AUTH_TOKEN.접근)
  // axios
  //   .post(`${process.env.NEXT_PUBLIC_API_URL}`, params, {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   })
  //   .then(response => {
  //     console.log('response:', response)
  //   })
  //   .catch(errors => {
  //     console.log('error:', errors)
  //   })

  useEffect(() => {
    reset({ ..._itemInfo })
    if (isEditMode) {
      query.invalidateQueries([ITEM.상세])
    }
  }, [])

  useEffect(() => {
    if (_itemInfo) {
      setValue('imgUrl', _itemInfo.imgUrl)
      setImagePreview(_itemInfo.imgUrl)
    }
  }, [])

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
          ) : (
            <Image
              src={`${
                _itemInfo?.imgUrl === ''
                  ? 'https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/assets/bg-white.png'
                  : `https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/upload/item/${_itemInfo?.imgUrl}`
              }`}
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
        <MultiSelectBox
          title={'창고선택'}
          data={STORAGES}
          selected={selectedStorage}
          setSelected={setSelectedStorage}
          essential
        />
        <SelectBox title={'분류'} data={KEEP_TYPES} selected={selectedType} setSelected={setSelectedType} essential />
        <Button text={'등록'} />
      </form>
    </Layout>
  )
}

export default EditItem
