import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { ApiError } from 'next/dist/server/api-utils'

import SelectBox from '@/app/components/atom/SelectBox'
import { markerItemsState, activatedWareHouseTitleState } from '@/app/store/atom'
import TextArea from '@/app/components/atom/TextArea'
import { WISH } from '@/app/libs/client/reactQuery/queryKey/profile/wish'
import { ItemList } from '@/app/apis/types/domain/warehouse/warehouse'
import { cls } from '@/app/libs/client/utils/util'

import { wish, saveWish, unWish } from '@/app/apis/domain/profile/wish'

interface CardSelectProps {
  title: string
  dragedPreviews: ItemList
  isDragedMixture: boolean
}

interface CardProps {
  description: string
}

const CardSelectModal = ({ title, dragedPreviews, isDragedMixture }: CardSelectProps) => {
  const query = useQueryClient()
  const [selectedType, setSelectedType] = useState<{ name: string }>({ name: '아이템 목록' })
  const markerItemsValue = useRecoilValue<{ name: string }[]>(markerItemsState)
  const selectedTitle = useRecoilValue<string>(activatedWareHouseTitleState)

  const itemInfo = dragedPreviews.itemList.find(v => v.name === selectedType.name)

  const {
    register,
    getValues,
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CardProps>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  // 관심 조회
  const { data: { data: wishs } = {} } = useQuery([WISH.조회], () => wish())

  // 관심 등록
  const { mutate: mutateWish } = useMutation(saveWish, {
    onSuccess: () => {
      query.invalidateQueries([WISH.조회])
      toast.success('아이템을 관심목록에 추가하였습니다.')
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // 관심 삭제
  const { mutate: mutateUnWish } = useMutation(unWish, {
    onSuccess: () => {
      query.invalidateQueries([WISH.조회])
      toast.success('관심 아이템에서 삭제되었습니다.')
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  const onSubmit = () => {}

  useEffect(() => {
    reset(itemInfo)
  }, [])

  useEffect(() => {
    if (isDragedMixture) setSelectedType({ name: selectedTitle })
  }, [isDragedMixture, title, selectedTitle])

  const onClickWish = (itemId: number) => {
    if (!itemId) return

    const isSubscribe = wishs && wishs.some(v => v.id === itemId)
    isSubscribe ? mutateUnWish(String(itemId)) : mutateWish(String(itemId))
  }

  // todo: react-hook-form 폼 프로바이더 적용해야 함
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={'text-center'}>
        <span className={'font-semibold'}>{title}</span>
      </div>
      <div className={'mb-5 mt-7 flex items-start gap-5'}>
        <div className={'relative'}>
          <Image
            width={'100'}
            src={`https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/upload/item/${encodeURIComponent(
              itemInfo?.imgUrl as string
            )}`}
            height={'100'}
            alt='아이템 이미지'
            className={'h-28 w-28 rounded border object-cover'}
          />
          <span
            role={'presentation'}
            className={'absolute right-1 top-1 cursor-pointer text-[#33CC99]'}
            onClick={() => onClickWish(itemInfo?.itemId as number)}>
            <svg
              className='h-5 w-5'
              fill={wishs?.some(v => v.id === itemInfo?.itemId) ? '#33CC99' : 'none'}
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.5'
                d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
              />
            </svg>
          </span>
        </div>
        <div className={'h-[100px]'}>
          <span
            className={cls(
              'inline-block rounded px-0.5 py-0.5 text-[10px] text-white',
              itemInfo?.type === 'BUY' ? 'bg-[#30BD81] !px-1' : 'bg-[#A3D139]'
            )}>
            {itemInfo?.type}
          </span>
          <span className={'ml-1.5 inline-block align-middle text-[13px]'}>{itemInfo?.category}</span>
          <span className={'mt-2 block text-sm'}>{itemInfo?.name}</span>
        </div>
      </div>
      <SelectBox data={markerItemsValue} selected={selectedType} setSelected={setSelectedType} />
      <div className={'mt-4'}>
        <TextArea
          label={'상품 설명'}
          readOnly
          register={register('description', {
            value: itemInfo?.description,
          })}
        />
        <p className='!mt-1.5 text-xs text-red-400'>{errors.description?.message}</p>
      </div>
    </form>
  )
}

export default CardSelectModal
