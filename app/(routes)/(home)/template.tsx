'use client'

import React, { useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useRecoilValue } from 'recoil'
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'
import { toast } from 'react-hot-toast'

import { accessTokenState } from '@/app/store/auth'

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const isLoggedIn = searchParams.get('isLoggedIn') === 'true'

  const accessToken = useRecoilValue<string | undefined>(accessTokenState)

  // 알림 구독
  const showNotification = useCallback(async () => {
    const EventSource = EventSourcePolyfill || NativeEventSource
    const SSE = await new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/api/subscribe`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    })

    SSE.onopen = () => {
      SSE.addEventListener('sse', event => {
        console.log('템플릿 SSE:', event)

        if (Notification.permission === 'granted') {
          const notification = new Notification('알림', {
            body: '템플릿 앱 알림을 구독하였습니다.',
          })

          toast.success('템플릿 앱 알림을 구독하였습니다.')
          return notification
        }
      })
    }

    SSE.onerror = () => {
      SSE.close()
    }
  }, [Notification.permission])

  useEffect(() => {
    showNotification()
  }, [showNotification])

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
