'use client'

import React, { useCallback, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'

import { NOTIFICATION_PERMISSION } from '@/app/libs/client/constants/code'

import { subscribe } from '@/app/apis/domain/profile/alarm'

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const isLoggedIn = searchParams.get('isLoggedIn') === 'true'

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
