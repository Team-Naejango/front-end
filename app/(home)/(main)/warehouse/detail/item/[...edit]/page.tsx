'use client'

import React, { useEffect, useState } from 'react'
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

import { itemInfo, save, modify, modifyStorage, StorageParam } from '@/app/apis/domain/warehouse/warehouse'

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

  const crud = searchParams.get('crud')
  const seq = searchParams.get('seq')
  const isEditMode = (crud === CRUD.수정 && seq !== '') || false

  const storageIds = selectedStorage.map(value => value.id)

  const {
    register,
    watch,
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
  const imgUrl = watch('imgUrl')

  // 아이템 조회
  const { data: { item: _itemInfo } = {} } = useQuery<{ item: ItemInfo }>([ITEM.상세], () => itemInfo(seq), {
    enabled: !!seq,
  })

  // 아이템 등록
  const { mutate: mutateSave } = useMutation<{ item: ItemParams }, ApiError, ItemParams>(save, {
    onSuccess: () => {
      query.invalidateQueries([ITEM.조회, WAREHOUSE.조회])
      toast.success('아이템이 등록되었습니다.')
      router.push(`/warehouse/detail/${seq}`)
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // 창고 수정
  const { mutate: mutateStorage } = useMutation<null, ApiError, StorageParam>(modifyStorage, {
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // 아이템 수정
  const { mutate: mutateModify } = useMutation<{ item: ItemInfo }, ApiError, OmitStorageIdItemInfo>(
    (params: OmitStorageIdItemInfo) => modify(seq!, params),
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

  const onSubmit = (data: ItemProps) => {
    const params: ItemProps = {
      name: data.name,
      description: data.description,
      imgUrl: '',
      type: selectedType.name,
      category: selectedCategory.name,
      storageIdList: storageIds,
    }
    console.log('params:', params)

    const { storageIdList, ...newParams } = params
    const editParams = { ...newParams, id: Number(seq) }

    isEditMode ? mutateModify(editParams) : mutateSave(params)

    /* TEST API CALL */
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
  }

  useEffect(() => {
    reset({ ..._itemInfo })
    if (isEditMode) {
      query.invalidateQueries([ITEM.상세])
    }
  }, [])

  useEffect(() => {
    if (_itemInfo) {
      setValue('imgUrl', _itemInfo.imgUrl)
    }
  }, [])

  return (
    <Layout canGoBack title={`아이템 ${isEditMode ? '편집' : '등록'}`}>
      <form className='mt-12 space-y-4 p-2' onSubmit={handleSubmit(onSubmit)}>
        <div className={'relative h-full w-full'}>
          {imgUrl === undefined ? (
            <InputFile
              id='file'
              dotted
              styleOption={
                'flex h-48 w-full items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-gray-600 hover:border-[#32D7A0] hover:text-[#32D7A0]'
              }
              {...register('imgUrl')}
              onChange={event => event}
            />
          ) : (
            <>
              <InputFile
                id='file'
                dotted
                styleOption={
                  'flex h-48 w-full items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-gray-600 hover:border-[#32D7A0] hover:text-[#32D7A0]'
                }
                {...register('imgUrl')}
                onChange={event => event}
              />
              <Image
                src={`https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/upload/${_itemInfo?.imgUrl}`}
                // defaultValue={imagePreview}
                width={'100'}
                height={'100'}
                alt='이미지 미리보기'
                className={'absolute left-0 top-0 -z-10 h-48 w-full object-cover'}
              />
            </>
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
