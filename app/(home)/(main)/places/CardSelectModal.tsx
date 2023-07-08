import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useForm } from 'react-hook-form'

import SelectBox from '@/app/components/atom/SelectBox'
import { markerItemsState, activatedWareHouseTitleState } from '@/app/store/atom'
import { positions } from '@/app/(home)/(main)/places/dummyData'

interface CardSelectProps {
  title: string
  isDragedMixture: boolean
  onClose: () => void
}

const CardSelectModal = ({ title, isDragedMixture, onClose }: CardSelectProps) => {
  const [selectedType, setSelectedType] = useState<{ name: string }>({ name: '아이템 목록' })
  const markerItemsValue = useRecoilValue<{ name: string }[]>(markerItemsState)
  const wareHouseTitleValue = useRecoilValue<string>(activatedWareHouseTitleState)

  const { register, watch, handleSubmit } = useForm()

  const onClickSubmit = () => {}

  useEffect(() => {
    if (isDragedMixture) setSelectedType({ name: title })
  }, [isDragedMixture, title, wareHouseTitleValue])

  return (
    <>
      <form onSubmit={handleSubmit(onClickSubmit)}>
        <div className={'text-center'}>
          <span className={'font-semibold'}>{title}</span>
        </div>
        <div className={'mb-4 mt-7 flex items-center gap-6'}>
          <div className={'h-[100px] w-[100px] rounded bg-[#ccc]'} />
          <div className={'flex h-[100px] flex-col justify-center'}>
            <span className={'flex-1 text-[13px]'}>아이템명</span>
            <p className={'flex-1 text-[13px]'}>설명</p>
          </div>
        </div>
        <SelectBox data={markerItemsValue} selected={selectedType} setSelected={setSelectedType} />
        <div className='mt-6 flex justify-center gap-6 text-center'>
          <button
            type='submit'
            className='inline-flex justify-center rounded-md border border-transparent bg-[#33CC99] px-4 py-2 text-sm font-medium text-white hover:bg-[#32D7A0] focus:outline-none focus:ring-2 focus:ring-[#33CC99] focus:ring-offset-1'>
            교환신청
          </button>
          <button
            type='button'
            className='inline-flex justify-center rounded-md border border-transparent bg-[#e9e9e9] px-4 py-2 text-sm font-medium hover:bg-[#e1e1e1] focus:outline-none'
            onClick={onClose}>
            취소
          </button>
        </div>
      </form>
    </>
  )
}

export default CardSelectModal
