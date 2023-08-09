'use client'

import React, { useEffect } from 'react'
import { initializeApp } from '@firebase/app'
import { getMessaging, getToken } from '@firebase/messaging'
import { toast } from 'react-hot-toast'
import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from '@/app/libs/client/constants/static'

export default function Template({ children }: { children: React.ReactNode }) {
  const serviceWorkerInit = async () => {
    const permission = await Notification.requestPermission()
    if (permission !== 'granted') return

    const firebaseApp = initializeApp({
      apiKey: FIREBASE_API_KEY,
      authDomain: FIREBASE_AUTH_DOMAIN,
      projectId: FIREBASE_PROJECT_ID,
      storageBucket: FIREBASE_STORAGE_BUCKET,
      messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
      appId: FIREBASE_APP_ID,
    })

    const messaging = getMessaging(firebaseApp)

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then(async registration => {
          await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
            serviceWorkerRegistration: registration,
          })
            .then(currentToken => {
              if (currentToken) {
                console.log('clientToken:', currentToken)
                // todo: token to backend server
                // todo: secondary rendering
                toast.success('알림이 구독되었습니다.')
              } else {
                toast.error('알림이 권한이 필요합니다.')
              }
            })
            .catch(error => {
              console.log('retrievingToken', error)
              toast.error('알림 동의에 오류가 발생했습니다.')
            })
        })
        .catch(error => {
          console.log('ServiceWorker Failed', error)
        })
    }
  }

  useEffect(() => {
    serviceWorkerInit()
  }, [])

  return <>{children}</>
}
