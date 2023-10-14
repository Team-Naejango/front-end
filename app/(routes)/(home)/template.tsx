'use client'

import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useRecoilValue } from 'recoil'
import { Event, EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'
import { toast } from 'react-hot-toast'

import { accessTokenState } from '@/app/store/auth'

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const isLoggedIn = searchParams.get('isLoggedIn') === 'true'

  const accessToken = useRecoilValue<string | undefined>(accessTokenState)

  // 알림 구독
  useEffect(() => {
    const showNotification = async () => {
      const EventSource = EventSourcePolyfill || NativeEventSource
      const SSE = await new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/api/subscribe`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      })

      /* EVENTSOURCE ONMESSAGE ---------------------------------------------------- */
      SSE.onopen = () => {
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
              body: '템플릿 앱 알림을 구독하였습니다.',
            })

            toast.success('템플릿 앱 알림을 구독하였습니다.')
            return notification
          }
          // }
        })
      }

      await showNotification()

      /* EVENTSOURCE ONERROR ------------------------------------------------------ */
      SSE.onerror = () => {
        SSE.addEventListener('error', event => {
          if (!event.error?.message.includes('No activity')) SSE.close()
        })
      }

      // return () => {
      //   SSE.close()
      // }
    }
  }, [])

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
