'use client'

import React, { useCallback, useEffect } from 'react'
import { toast } from 'react-hot-toast'

import { NOTIFICATION_PERMISSION } from '@/app/libs/client/constants/code'

import { subscribe } from '@/app/apis/domain/profile/alarm'

export default function Template({ children }: { children: React.ReactNode }) {
  const notificationPermission = typeof Notification === 'undefined' ? undefined : Notification.permission

  const serviceWorkerInit = async () => {
    const permission = await Notification.requestPermission()
    if (permission !== 'granted') return

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(async () => {
        try {
          if (permission === NOTIFICATION_PERMISSION.허용) {
            await subscribe({ contentType: 'text/event-stream;charset=UTF-8' })
            notificationPermission !== NOTIFICATION_PERMISSION.허용 && toast.success('[알림] 알림이 구독되었습니다.')
          } else {
            toast.error('[알림] 알림이 권한이 필요합니다.')
          }
        } catch (error) {
          console.error('서비스워커 실패:', error)
          // return Promise.reject(error)
          // toast.error('[알림] 알림 동의에 오류가 발생했습니다.')
        }
      })
    }
  }

  const notificationCallback = useCallback(() => {
    return (
      typeof navigator !== 'undefined' &&
      navigator.serviceWorker.addEventListener('message', event => {
        const message = event.data
        if (message.type === 'showToast') {
          toast.success(message.message)
        }
      })
    )
  }, [])

  useEffect(() => {
    serviceWorkerInit()
  }, [])

  useEffect(() => {
    notificationCallback()
  }, [notificationCallback])

  return <>{children}</>
}
