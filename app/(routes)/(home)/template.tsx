'use client'

import React, { useCallback, useEffect } from 'react'
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

  const accessToken = useRecoilValue<string | undefined>(accessTokenState)

  const isLoggedIn = searchParams.get('isLoggedIn') === 'true'

  // 수신 알림 타입
  const getAlarmStatus = (value: E_NOTIFICATION_TYPE) => {
    return {
      TRANSACTION: '거래',
      CHATTING: '채팅',
    }[value]
  }

  // 알림 노출
  const showNotification = (title: string, content?: string) => {
    if (Notification.permission === 'granted') {
      const notification = new Notification(title, {
        body: content,
      })
      return notification
    }
  }

  // 브라우저 알림 구독
  const subscribe = useCallback(async () => {
    const EventSource = EventSourcePolyfill || NativeEventSource
    const SSE = await new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/api/subscribe`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      heartbeatTimeout: 1000 * 60 * 60, // 60분
      withCredentials: true,
    })

    // 첫 알림 푸시
    SSE.onopen = () => {
      if (Notification.permission === 'granted') {
        showNotification('알림', '앱 알림을 구독하였습니다.')
        toast.success('앱 알림을 구독하였습니다.')
      }
    }

    SSE.onerror = () => {
      SSE.close()
    }

    // SSE 감지 후 브라우저 알림 노출
    SSE.addEventListener('sse', (event: any) => {
      const eventData = JSON.parse(event.data)

      if (eventData) {
        const alarmInfo: SSEType = {
          ...eventData,
        }

        if (Notification.permission === 'granted') {
          showNotification(getAlarmStatus(alarmInfo.notificationType), alarmInfo.content)
          toast.success(`${alarmInfo.content}이 도착했습니다.`)
        }
      }
    })

    return () => {
      SSE.close()
    }
  }, [EventSourcePolyfill, NativeEventSource])

  // 서비스 워커 등록
  useEffect(() => {
    const serviceWorkerInit = async () => {
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') return

      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(async () => {
          try {
            if (permission === NOTIFICATION_PERMISSION.허용) {
              await subscribe()
            }
          } catch (error) {
            console.error('서비스워커 실패:', error)
          }
        })
      }
    }
    serviceWorkerInit()
  }, [])

  // 뒤로가기 막음
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
