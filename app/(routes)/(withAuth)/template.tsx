'use client'

import React, { useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { AxiosError } from 'axios'
import { EventSourcePolyfill } from 'event-source-polyfill'
import jwtDecode from 'jwt-decode'
import { toast } from 'react-hot-toast'

import { accessTokenSelector, accessTokenState } from '@/app/store/auth'
import { E_NOTIFICATION_TYPE, E_SWITCH_STATUS, NOTIFICATION_PERMISSION } from '@/app/libs/client/constants/code'
import { SSEType } from '@/app/apis/types/domain/common/alarm'
import { currentLocationState } from '@/app/store/atom'
import { COMMON_STORE_KEY } from '@/app/libs/client/constants/store/common'
// import { useUnloadEffect } from '@/app/hooks/useUnloadEffect'

// import { logout } from '@/app/apis/domain/auth/auth'
import { refresh } from '@/app/apis/domain/auth/auth'

interface EventSourceOption {
  headers: {
    Authorization: string
  }
  heartbeatTimeout: number
  withCredentials: boolean
}

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const isCurrentLocationStatus = useRecoilValue<E_SWITCH_STATUS>(currentLocationState)
  const setNewAccessToken = useSetRecoilState<string | undefined>(accessTokenState)
  const accessToken = useRecoilValue<string | undefined>(accessTokenSelector)

  const isLoggedIn = searchParams.get('isLoggedIn') === 'true'

  // 브라우저 알림 구독
  const subscribe = useCallback(
    async (firstConnection: boolean, token: string | undefined) => {
      const decodedToken = jwtDecode(token || '') as { exp: number }
      const expTime = decodedToken.exp * 1000
      const currentTime = Date.now()

      let options: EventSourceOption = {
        headers: { Authorization: '' },
        heartbeatTimeout: 1000 * 60 * 60,
        withCredentials: true,
      }

      // 토큰 만료별 조건
      if (currentTime < expTime) {
        options = {
          ...options,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      } else {
        const response = await refresh()

        setNewAccessToken(response.data.result)
        options = {
          ...options,
          headers: {
            Authorization: `Bearer ${response.data.result}`,
          },
        }
      }

      const SSE = new EventSourcePolyfill(`${process.env.NEXT_PUBLIC_API_URL}/api/subscribe`, { ...options })

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

      // 재연결 시도
      SSE.onerror = () => {
        SSE.close()
        subscribe(false, accessToken)
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
    [accessToken, setNewAccessToken]
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
              await subscribe(true, accessToken)
            } catch (error: unknown) {
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

  useEffect(() => {
    if (isLoggedIn && !isCurrentLocationStatus) {
      localStorage.setItem(COMMON_STORE_KEY.주소, '서울 강남구 역삼동 858')
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
  // useUnloadEffect(async () => {
  //   await logout()
  // })

  return <>{children}</>
}
