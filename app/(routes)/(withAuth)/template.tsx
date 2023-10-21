'use client'

import React, { useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useRecoilValue } from 'recoil'
import { AxiosError } from 'axios'
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'
import { toast } from 'react-hot-toast'

import { accessTokenState } from '@/app/store/auth'
import { E_NOTIFICATION_TYPE, NOTIFICATION_PERMISSION } from '@/app/libs/client/constants/code'
import { SSEType } from '@/app/apis/types/domain/common/alarm'
import { useUnloadEffect } from '@/app/hooks/useUnloadEffect'

import { logout } from '@/app/apis/domain/auth/auth'

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const accessToken = useRecoilValue<string | undefined>(accessTokenState)

  const isLoggedIn = searchParams.get('isLoggedIn') === 'true'

  // 브라우저 알림 구독
  const subscribe = useCallback(
    async (firstConnection: boolean) => {
      const EventSource = EventSourcePolyfill || NativeEventSource
      const SSE = await new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/api/subscribe`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        heartbeatTimeout: 1000 * 60 * 60, // 60분
        withCredentials: true,
      })

      // 알림 노출
      const showNotification = (title: string, content?: string) => {
        if (Notification.permission === NOTIFICATION_PERMISSION.허용) {
          const notification = new Notification(title, {
            body: content,
          })
          return notification
        }
      }

      SSE.onopen = () => {
        if (Notification.permission === NOTIFICATION_PERMISSION.허용) {
          // 첫 알림 푸시
          if (firstConnection) {
            showNotification('알림', '앱 알림을 구독하였습니다.')
            toast.success('앱 알림을 구독하였습니다.')
          } else {
            console.log('재연결 완료')
          }
        }
      }

      SSE.onerror = () => {
        SSE.close()
      }

      // SSE 감지 후 브라우저 알림 푸시
      SSE.addEventListener('sse', (event: any) => {
        const isJson = (data: string) => {
          try {
            const json = JSON.parse(data)
            return json && typeof json === 'object'
          } catch (error: unknown) {
            return false
          }
        }

        if (isJson(event.data)) {
          const eventData = JSON.parse(event.data)

          if (eventData) {
            const alarmInfo: SSEType = {
              ...eventData,
            }

            // 수신 알림 타입
            const getAlarmStatus = (value: E_NOTIFICATION_TYPE) => {
              return {
                TRANSACTION: '거래',
                CHAT: '채팅',
              }[value]
            }

            if (Notification.permission === NOTIFICATION_PERMISSION.허용) {
              showNotification(getAlarmStatus(alarmInfo.notificationType), alarmInfo.content)
              toast.success(`${alarmInfo.content}`)
            }
          }
        }
      })

      return () => {
        SSE.close()
      }
    },
    [EventSourcePolyfill, NativeEventSource]
  )

  // 서비스 워커 등록
  useEffect(() => {
    if (isLoggedIn) {
      const serviceWorkerInit = async () => {
        const permission = await Notification.requestPermission()
        if (permission !== NOTIFICATION_PERMISSION.허용) return

        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/sw.js').then(async () => {
            try {
              await subscribe(true)
            } catch (error) {
              if (error instanceof AxiosError) {
                return Promise.reject(error)
              }
            }
          })
        }
      }
      serviceWorkerInit()
    }
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

  // 브라우저 종료 시
  useUnloadEffect(async () => {
    await logout()
  })

  return <>{children}</>
}
