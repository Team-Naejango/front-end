'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'
import dynamic from 'next/dynamic'

import Layout from '@/app/components/template/main/layout/Layout'
import Loading from '@/app/loading'
import EventCarousel from '@/app/components/organism/home/EventCarousel'
import Button from '@/app/components/atom/Button'
import GroupChatCard from '@/app/components/organism/home/GroupChatCard'
import { MODAL_TYPES } from '@/app/libs/client/constants/code'
import { WAREHOUSE } from '@/app/libs/client/reactQuery/queryKey/warehouse'
import { useModal } from '@/app/hooks/useModal'
import { modalSelector } from '@/app/store/modal'
import SelectStorage from '@/app/components/organism/home/SelectStorage'

import { storage } from '@/app/apis/domain/warehouse/warehouse'

const CustomModal = dynamic(() => import('@/app/components/molecule/modal/CustomModal'), {
  ssr: false,
  loading: () => <Loading />,
})

const Home = () => {
  const router = useRouter()
  const { openModal, closeModal } = useModal()
  const [selectedStorage, setSelectedStorage] = useState<number | null>(null)
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0)
  const _fork = useRecoilValue(modalSelector('fork'))
  const _item = useRecoilValue(modalSelector('item'))

  // 창고 조회
  const { data: { data: storageInfo } = {} } = useQuery([WAREHOUSE.조회], () => storage())

  // 창고 아이템 리다이렉트
  useEffect(() => {
    if (selectedStorage === null) return

    closeModal('item')
    router.push(`/warehouse/detail/item/edit?crud=C&storage=${selectedStorage}&count=${currentSlideIndex}&item=`)
  }, [selectedStorage])

  // 창고 & 아이템 선택 모달
  const onSelectStorageOrItem = () => {
    openModal({
      modal: {
        id: 'fork',
        type: MODAL_TYPES.ALERT,
        title: '선택',
      },
    })
  }

  // 아이템 추가할 창고 선택
  const onSelectStorage = (storageId: number, index: number) => {
    if (!storageId) return

    setSelectedStorage(storageId)
    setCurrentSlideIndex(index)
  }

  // 아이템 창고 선택 모달
  const onSelectStorageModal = () => {
    closeModal('fork')

    openModal({
      modal: {
        id: 'item',
        type: MODAL_TYPES.ALERT,
        title: '창고 선택',
      },
    })
  }

  // 창고 생성 리다이렉트
  const onSelectAddStorage = () => {
    closeModal('fork')
    router.push(`/warehouse/edit?crud=C&storage=${(storageInfo?.result.length || 0) + 1}`)
  }

  return (
    <Layout hasHeader seoTitle={'홈'}>
      <div className='relative flex items-center justify-center'>
        <div className={'w-full pb-6'}>
          <EventCarousel />
          <div className={'mt-[19.5rem] text-center'}>
            <p className={'text-sm font-medium'}>주변에 어떤 아이템이 있을까?</p>
            <Button small text={'탐색하기'} className={'!mt-4'} onClick={() => router.push('/places')} />
          </div>
          <GroupChatCard />
        </div>
        <span
          role={'presentation'}
          className={
            'fixed bottom-24 right-5 z-[9999] flex aspect-square w-12 cursor-pointer items-center justify-center rounded-full border-0 border-transparent bg-[#33CC99] text-white shadow-sm transition-colors hover:bg-[#32D7A0]'
          }
          onClick={onSelectStorageOrItem}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='2'
            stroke='currentColor'
            className='h-6 w-6'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
          </svg>
        </span>
      </div>

      {_fork.modal.show ? (
        <CustomModal id={_fork.modal.id} type={MODAL_TYPES.ALERT}>
          <div className={'flex gap-2 py-2'}>
            <Button small text={'창고생성'} onClick={onSelectAddStorage} />
            <Button small text={'아이템생성'} onClick={onSelectStorageModal} />
          </div>
        </CustomModal>
      ) : null}

      {_item.modal.show ? (
        <CustomModal id={_item.modal.id} type={MODAL_TYPES.DIALOG}>
          <SelectStorage storageInfo={storageInfo} selectStorage={selectedStorage} onSelectStorage={onSelectStorage} />
        </CustomModal>
      ) : null}
    </Layout>
  )
}

export default Home
