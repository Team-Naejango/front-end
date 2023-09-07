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
import { OAUTH } from '@/app/libs/client/reactQuery/queryKey/auth'
import { MODAL_TYPES } from '@/app/libs/client/constants/code'
import { WAREHOUSE } from '@/app/libs/client/reactQuery/queryKey/warehouse'
import { useModal } from '@/app/hooks/useModal'
import { modalSelector } from '@/app/store/modal'

import { userInfo } from '@/app/apis/domain/profile/profile'
import { storage } from '@/app/apis/domain/warehouse/warehouse'

const CustomModal = dynamic(() => import('@/app/components/molecule/modal/CustomModal'), {
  ssr: false,
  loading: () => <Loading />,
})

async function getUser() {
  const response = await userInfo()
  return response
}

const Home = () => {
  const router = useRouter()
  const { openModal } = useModal()
  const [selectedStorage, setSelectedStorage] = useState<number>(1)
  const _fork = useRecoilValue(modalSelector('fork'))
  const _item = useRecoilValue(modalSelector('item'))

  const getUserInfo = async () => {
    const userInfo = await getUser()
    console.log('userInfo:', userInfo)
    return userInfo
  }

  // 유저 조회
  const { data: getUserData } = useQuery([OAUTH.유저정보], () => userInfo())

  // 창고 조회
  const { data: { data: _storageInfo } = {} } = useQuery([WAREHOUSE.조회], () => storage())
  const { count, storageList } = _storageInfo || {}

  console.log('getUserData:', getUserData)

  const onSelectedStorage = (storageId: number) => {
    setSelectedStorage(storageId)
  }

  const onSelectedAddStorage = () => {
    router.push(`/warehouse/${(count || 0) + 1}?crud=C&seq=`)
  }

  const onModal = () => {
    openModal({
      modal: {
        id: 'fork',
        type: MODAL_TYPES.CONFIRM,
      },
    })
  }

  // todo: 모달창 내에서 selectedStorage state 감지하기
  const selectedStorageModal = () => {
    openModal({
      modal: {
        id: 'item',
        type: MODAL_TYPES.CONFIRM,
        title: '창고 선택',
      },
      callback: () => {
        if (!selectedStorage) return
        router.push(`/warehouse/detail/item/edit?crud=C&storage=${selectedStorage}&seq=`)
      },
    })
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  useEffect(() => {
    setSelectedStorage(selectedStorage)
  }, [selectedStorage])

  return (
    <Layout hasHeader seoTitle={'홈'}>
      <div className='flex items-center justify-center'>
        <div className={'mt-8 w-full'}>
          <EventCarousel />
          <div className={'mt-[22rem] text-center'}>
            <p className={'text-[15px] font-medium'}>내 주변에서 물물교환을 하고 싶다면?</p>
            <Button small text={'탐색하기'} className={'!mt-4'} onClick={() => router.push('/places')} />
          </div>
          <span
            role={'presentation'}
            className={
              'fixed bottom-24 right-5 flex aspect-square w-12 cursor-pointer items-center justify-center rounded-full border-0 border-transparent bg-[#32D7A0] text-white shadow-sm transition-colors hover:bg-[#33CC99]'
            }
            onClick={onModal}>
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
      </div>

      {_fork.modal.show ? (
        <CustomModal id={_fork.modal.id} type={MODAL_TYPES.CONFIRM}>
          <h2 className={'text-center text-lg font-semibold'}>선택</h2>
          <div className={'mt-6 flex gap-4'}>
            <Button small text={'창고생성'} onClick={onSelectedAddStorage} />
            <Button small text={'아이템생성'} onClick={() => selectedStorageModal()} />
          </div>
        </CustomModal>
      ) : null}

      {_item.modal.show ? (
        <CustomModal id={_item.modal.id} type={MODAL_TYPES.DIALOG}>
          <div className={'flex h-full items-center justify-center gap-4 pb-4 pt-2'}>
            {storageList ? (
              storageList.map(storage => {
                return (
                  <button
                    key={storage.id}
                    className={`ml-2 whitespace-nowrap rounded-md border border-gray-300 px-4 py-2.5 text-[13px] font-medium text-[#222] shadow-sm hover:border-transparent hover:bg-[#33CC99] hover:text-[#fff] focus:outline-none ${
                      selectedStorage === storage.id ? `border-transparent bg-[#33CC99] text-[#fff]` : ''
                    }`}
                    onClick={() => onSelectedStorage(storage.id)}>
                    {storage.name}
                  </button>
                )
              })
            ) : (
              <span className={'text-sm'}>창고를 생성해주세요.</span>
            )}
          </div>
        </CustomModal>
      ) : null}
    </Layout>
  )
}

export default Home
