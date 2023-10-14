'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useRecoilValue } from 'recoil'
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'
import { toast } from 'react-hot-toast'

import { accessTokenState } from '@/app/store/auth'
import { E_NOTIFICATION_TYPE, NOTIFICATION_PERMISSION } from '@/app/libs/client/constants/code'
import { SSEType } from '@/app/apis/types/domain/common/alarm'

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [notificationState, setNotificationState] = useState<boolean>(true)

  const accessToken = useRecoilValue<string | undefined>(accessTokenState)

  const isLoggedIn = searchParams.get('isLoggedIn') === 'true'

  // 수신 알림 타입
  const getAlarmStatus = (value: E_NOTIFICATION_TYPE) => {
    return {
      TRANSACTION: '거래',
      CHATTING: '채팅',
    }[value]
  }

  // 알림 구독
  const subscribe = useCallback(async () => {
    const EventSource = EventSourcePolyfill || NativeEventSource
    const SSE = await new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/api/subscribe`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    })

    /* EVENTSOURCE ONMESSAGE ---------------------------------------------------- */
    SSE.onopen = () => {
      console.log('test')
      if (Notification.permission === 'granted' && isLoggedIn && notificationState) {
        console.log('isLoggedIn:', isLoggedIn)
        console.log('notificationState:', notificationState)
        console.log('test222')
        const notification = new Notification('알림', {
          body: '앱 알림을 구독하였습니다.',
        })

        toast.success('앱 알림을 구독하였습니다.')
        setNotificationState(false)
        return notification
      }
    }

    SSE.addEventListener('sse', (event: any) => {
      const eventData = JSON.parse(event.data)
      if (eventData.includes('EventStream Created.')) return

      if (eventData) {
        const alarmInfo: SSEType = {
          ...eventData,
        }

        if (Notification.permission === 'granted') {
          const notification = new Notification(getAlarmStatus(alarmInfo.notificationType), {
            body: alarmInfo.content,
          })

          toast.success(`${alarmInfo.content}이 도착했습니다.`)
          return notification
        }
      }
    })

    return () => {
      SSE.close()
    }
  }, [isLoggedIn, notificationState])

  useEffect(() => {
    // 서비스 워커 등록
    const serviceWorkerInit = async () => {
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') return

      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(async () => {
          try {
            if (permission === NOTIFICATION_PERMISSION.허용 && notificationState) {
              setNotificationState(false)
              await subscribe()
            }
          } catch (error) {
            console.error('서비스워커 실패:', error)
          }
        })
      }
    }

    if (isLoggedIn && notificationState) {
      serviceWorkerInit()
    }
  }, [EventSourcePolyfill, NativeEventSource])

  useEffect(() => {
    if (isLoggedIn) {
      const onLimitBack = () => {
        window.addEventListener('popstate', () => {
          router.replace('/home')
        })
      }
      window.addEventListener('popstate', onLimitBack)
      return () => {
        window.removeEventListener('popstate', onLimitBack)
      }
    }
  }, [isLoggedIn, router])

  return <>{children}</>
}
