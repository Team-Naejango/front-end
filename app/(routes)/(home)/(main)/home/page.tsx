'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'
import dynamic from 'next/dynamic'
import { Event, EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'
import { toast } from 'react-hot-toast'

import Layout from '@/app/components/template/main/layout/Layout'
import Loading from '@/app/loading'
import EventCarousel from '@/app/components/organism/home/EventCarousel'
import Button from '@/app/components/atom/Button'
import GroupChatCard from '@/app/components/organism/home/GroupChatCard'
import { MODAL_TYPES, NOTIFICATION_PERMISSION } from '@/app/libs/client/constants/code'
import { WAREHOUSE } from '@/app/libs/client/reactQuery/queryKey/warehouse'
import { useModal } from '@/app/hooks/useModal'
import { modalSelector } from '@/app/store/modal'
import { accessTokenState } from '@/app/store/auth'
import SelectStorage from '@/app/components/organism/home/SelectStorage'

import { storage } from '@/app/apis/domain/warehouse/warehouse'

const CustomModal = dynamic(() => import('@/app/components/molecule/modal/CustomModal'), {
  ssr: false,
  loading: () => <Loading />,
})

const Home = () => {
  const router = useRouter()
  const useParams = useSearchParams()
  const { openModal, closeModal } = useModal()

  const [selectedStorage, setSelectedStorage] = useState<number | null>(null)
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0)
  const [notificationState, setNotificationState] = useState<boolean>(true)

  const accessToken = useRecoilValue<string | undefined>(accessTokenState)
  const _fork = useRecoilValue(modalSelector('fork'))
  const _item = useRecoilValue(modalSelector('item'))

  const firstLogin = useParams.get('isLoggedIn')

  // 창고 조회
  const { data: { data: storageInfo } = {} } = useQuery([WAREHOUSE.조회], () => storage())

  // 알림 구독
  const subscribe = async () => {
    if (firstLogin === 'true' && notificationState) {
      const EventSource = EventSourcePolyfill || NativeEventSource
      const SSE = await new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/api/subscribe`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      })

      /* EVENTSOURCE ONMESSAGE ---------------------------------------------------- */
      // SSE.onopen = () => {
      SSE.addEventListener('sse', (event: Event) => {
        console.log('홈 SSE:', event)

        // const isJson = (str: any) => {
        //   try {
        //     const json = JSON.parse(str)
        //     return json && typeof json === 'object'
        //   } catch (e) {
        //     return false
        //   }
        // }
        // if (isJson(event?.data)) {
        //   const obj = JSON.parse(event?.data)
        //   console.log('obj:', obj)

        if (Notification.permission === 'granted') {
          const notification = new Notification('알림', {
            body: '홈 앱 알림을 구독하였습니다.',
          })

          toast.success('홈 앱 알림을 구독하였습니다.')
          return notification
        }
        // }
      })
      // }

      /* EVENTSOURCE ONERROR ------------------------------------------------------ */
      SSE.onerror = () => {
        SSE.addEventListener('error', event => {
          if (!event.error?.message.includes('No activity')) SSE.close()
        })
      }
    }
  }

  // 서비스 워커 등록
  const serviceWorkerInit = async () => {
    const permission = await Notification.requestPermission()
    if (permission !== 'granted') return

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(async () => {
        try {
          if (permission === NOTIFICATION_PERMISSION.허용) {
            if (firstLogin === 'true' && notificationState) {
              setNotificationState(false)
              await subscribe()
            }
          }
        } catch (error) {
          console.error('서비스워커 실패:', error)
        }
      })
    }
  }

  useEffect(() => {
    if (firstLogin === 'true' && notificationState) {
      serviceWorkerInit()
    }
  }, [])

  // 창고 아이템 리다이렉트
  useEffect(() => {
    if (selectedStorage === null) return

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
            'fixed bottom-24 right-5 flex aspect-square w-12 cursor-pointer items-center justify-center rounded-full border-0 border-transparent bg-[#33CC99] text-white shadow-sm transition-colors hover:bg-[#32D7A0]'
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
          <div className={'flex gap-4 py-2'}>
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
