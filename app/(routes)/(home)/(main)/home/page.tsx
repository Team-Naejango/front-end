'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import dynamic from 'next/dynamic'

import Layout from '@/app/components/template/main/layout/Layout'
import Loading from '@/app/loading'
import EventCarousel from '@/app/components/organism/home/EventCarousel'
import Button from '@/app/components/atom/Button'
import GroupChatCard from '@/app/components/organism/home/GroupChatCard'
import { MODAL_TYPES, NOTIFICATION_PERMISSION } from '@/app/libs/client/constants/code'
import { WAREHOUSE } from '@/app/libs/client/reactQuery/queryKey/warehouse'
import { useModal } from '@/app/hooks/useModal'
import { modalSelector } from '@/app/store/modal'

import { storage } from '@/app/apis/domain/warehouse/warehouse'
import { toast } from 'react-hot-toast'
import { subscribe } from '@/app/apis/domain/profile/alarm'
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'
import { accessTokenStore } from '@/app/store/atom'

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
  const accessToken = useRecoilValue<string>(accessTokenStore)

  console.log('accessToken:', accessToken)

  // 창고 조회
  const { data: { data: _storageInfo } = {} } = useQuery([WAREHOUSE.조회], () => storage())

  // 창고 & 아이템 선택 모달
  const onSelectedStorageOrItem = () => {
    openModal({
      modal: {
        id: 'fork',
        type: MODAL_TYPES.ALERT,
        title: '선택',
      },
    })
  }

  // 아이템 창고 선택 모달
  const selectedStorageModal = () => {
    closeModal('fork')

    openModal({
      modal: {
        id: 'item',
        type: MODAL_TYPES.ALERT,
        title: '창고 선택',
      },
    })
  }

  const notificationPermission = typeof Notification === 'undefined' ? undefined : Notification.permission

  const onChatRequest = async () => {
    if (Notification.permission === 'granted') {
      const notification = new Notification('채팅 알림', {
        body: '상대방이 개인 채팅 신청을 하였습니다.',
      })

      toast.success('테스트 문구입니다~')
      return notification
    }
  }

  // 서비스워커 시작
  const serviceWorkerInit = async () => {
    const permission = await Notification.requestPermission()
    if (permission !== 'granted') return

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(async () => {
        try {
          if (permission === NOTIFICATION_PERMISSION.허용) {
            await subscribe({ contentType: 'text/event-stream;charset=UTF-8' })

            if (notificationPermission !== NOTIFICATION_PERMISSION.허용) {
              toast.success('[알림] 알림이 구독되었습니다.')
            }
          } else {
            toast.success('[알림] 알림을 거부하였습니다.')
          }
        } catch (error) {
          console.error('서비스워커 실패:', error)
        }
      })
    }

    const accessToken = localStorage.getItem('accessToken')

    const EventSource = EventSourcePolyfill || NativeEventSource
    const SSE = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/api/subscribe`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    })

    SSE.addEventListener('sse', event => {
      console.log('SSE 이벤트 수신:', event)

      onChatRequest()
    })
  }

  // 알림 전달
  const notificationCallback = useCallback(() => {
    return navigator.serviceWorker.addEventListener('message', event => {
      const message = event.data
      if (message.type === 'showToast') {
        toast.success(message.message)
      }
    })
  }, [])

  useEffect(() => {
    serviceWorkerInit()
  }, [])

  useEffect(() => {
    notificationCallback()
  }, [notificationCallback])

  // 창고 아이템 리다이렉트
  useEffect(() => {
    if (selectedStorage === null) return

    router.push(`/warehouse/detail/item/edit?crud=C&storage=${selectedStorage}&count=${currentSlideIndex}&item=`)
  }, [selectedStorage])

  // 아이템 추가할 창고 선택
  const onSelectedStorage = (storageId: number, idx: number) => {
    if (!storageId) return

    setSelectedStorage(storageId)
    setCurrentSlideIndex(idx)
  }

  // 창고 생성 리다이렉트
  const onSelectedAddStorage = () => {
    router.push(`/warehouse/edit?crud=C&storage=${(_storageInfo?.result.length || 0) + 1}`)
  }

  return (
    <Layout hasHeader seoTitle={'홈'}>
      <div className='relative flex items-center justify-center'>
        <div className={'w-full pb-6'}>
          <EventCarousel />
          <div className={'mt-80 text-center'}>
            <p className={'text-sm font-medium'}>내 주변에서 물물교환을 하고 싶다면?</p>
            <Button small text={'탐색하기'} className={'!mt-4'} onClick={() => router.push('/places')} />
          </div>
          <GroupChatCard />
        </div>
        <span
          role={'presentation'}
          className={
            'fixed bottom-24 right-5 flex aspect-square w-12 cursor-pointer items-center justify-center rounded-full border-0 border-transparent bg-[#33CC99] text-white shadow-sm transition-colors hover:bg-[#32D7A0]'
          }
          onClick={onSelectedStorageOrItem}>
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
          <div className={'flex gap-4 py-2'}>
            <Button small text={'창고생성'} onClick={onSelectedAddStorage} />
            <Button small text={'아이템생성'} onClick={selectedStorageModal} />
          </div>
        </CustomModal>
      ) : null}

      {_item.modal.show ? (
        <CustomModal id={_item.modal.id} type={MODAL_TYPES.DIALOG}>
          <div className={'flex h-full flex-wrap items-center justify-center gap-4 py-2'}>
            {_storageInfo?.result ? (
              _storageInfo?.result.map((storage, idx) => {
                return (
                  <button
                    key={storage.storageId}
                    className={`ml-2 whitespace-nowrap rounded-md border border-gray-300 px-4 py-2.5 text-[13px] font-medium text-[#222] shadow-sm hover:border-transparent hover:bg-[#33CC99] hover:text-[#fff] focus:outline-none ${
                      selectedStorage === storage.storageId ? `border-transparent bg-[#33CC99] text-[#fff]` : ''
                    }`}
                    onClick={() => onSelectedStorage(storage.storageId, idx)}>
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
