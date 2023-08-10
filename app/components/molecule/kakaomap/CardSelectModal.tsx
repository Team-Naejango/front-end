import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { ApiError } from 'next/dist/server/api-utils'

import SelectBox from '@/app/components/atom/SelectBox'
import { markerItemsState, activatedWareHouseTitleState } from '@/app/store/atom'
import { positions } from '@/app/(home)/(main)/places/dummyData'
import TextArea from '@/app/components/atom/TextArea'
import { WISH } from '@/app/libs/client/reactQuery/queryKey/profile/wish'

import { wish, saveWish, unWish } from '@/app/apis/domain/profile/wish'

interface CardSelectProps {
  title: string
  isDragedMixture: boolean
  onClose: () => void
}

const CardSelectModal = ({ title, isDragedMixture, onClose }: CardSelectProps) => {
  const query = useQueryClient()
  const [selectedType, setSelectedType] = useState<{ name: string }>({ name: '아이템 목록' })
  const markerItemsValue = useRecoilValue<{ name: string }[]>(markerItemsState)
  const wareHouseTitleValue = useRecoilValue<string>(activatedWareHouseTitleState)

  const { register, watch, handleSubmit } = useForm()

  // 관심 조회
  const { data: { wish: wishs } = {} } = useQuery([WISH.조회], () => wish(), {
    // enabled: '',
  })

  // 관심 등록
  const { mutate: mutateWish } = useMutation(saveWish, {
    onSuccess: () => {
      query.invalidateQueries([WISH.조회])
      toast.success('관심 상품으로 등록되었습니다.')
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // 관심 취소
  const { mutate: mutateUnWish } = useMutation(unWish, {
    onSuccess: () => {
      query.invalidateQueries([WISH.조회])
      toast.success('관심 상품이 취소되었습니다.')
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  const onClickSubmit = () => {}

  useEffect(() => {
    if (isDragedMixture) setSelectedType({ name: title })
  }, [isDragedMixture, title, wareHouseTitleValue])

  const onClickWish = (itemId: number) => {
    if (!itemId) return
    mutateWish(String(itemId))
    mutateUnWish(String(itemId))
  }

  return (
    <form onSubmit={handleSubmit(onClickSubmit)}>
      <div className={'text-center'}>
        <span className={'font-semibold'}>{title}</span>
      </div>
      <div className={'mb-4 mt-7 flex items-center gap-6'}>
        <div className={'relative h-[100px] w-[100px] rounded bg-[#ccc]'}>
          <span role={'presentation'} className={'absolute right-1 top-1 cursor-pointer text-[#33CC99]'}>
            <svg
              className='h-5 w-5'
              fill={'none'}
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
        <div className={'flex h-[100px] flex-col justify-center'}>
          <span className={'flex-1 text-[13px]'}>아이템명</span>
          <p className={'flex-1 text-[13px]'}>설명</p>
        </div>
      </div>
      <SelectBox data={markerItemsValue} selected={selectedType} setSelected={setSelectedType} />
      <div className={'mt-3'}>
        <TextArea label={'채팅'} placeholder={'메시지 내용'} />
      </div>
    </form>
  )
}

export default CardSelectModal
