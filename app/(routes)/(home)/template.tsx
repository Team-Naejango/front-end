'use client'

import React, { useCallback, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'

import { NOTIFICATION_PERMISSION } from '@/app/libs/client/constants/code'

import { subscribe } from '@/app/apis/domain/profile/alarm'

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const isLoggedIn = searchParams.get('isLoggedIn') === 'true'
  const notificationPermission = typeof Notification === 'undefined' ? undefined : Notification.permission

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

  useEffect(() => {
    notificationCallback()
  }, [notificationCallback])

  return <>{children}</>
}
