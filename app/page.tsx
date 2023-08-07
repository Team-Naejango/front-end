'use client'

import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'

import Login from '@/app/(auth)/(main)/login/page'
import Home from '@/app/(home)/(main)/home/page'
import { getCookie } from '@/app/libs/client/utils/cookie'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store/common'
import { useClearSession } from '@/app/hooks/useClearSession'
import { getMessaging, getToken } from '@firebase/messaging'
import { initializeApp } from '@firebase/app'

const App: NextPage = () => {
  const router = useRouter()
  const { ResetToken } = useClearSession()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const accessToken = getCookie(AUTH_TOKEN.접근)

  const x = async () => {
    const permission = await Notification.requestPermission()
    if (permission !== 'granted') return

    const firebaseApp = initializeApp({
      apiKey: 'AIzaSyAxyOdpGIONpW9y2xwnskMxvHotpystoK0',
      authDomain: 'naejango-9f387.firebaseapp.com',
      projectId: 'naejango-9f387',
      storageBucket: 'naejango-9f387.appspot.com',
      messagingSenderId: '544393338037',
      appId: '1:544393338037:web:0da3309952fdf3547172fc',
    })

    const messaging = getMessaging(firebaseApp)

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then(registration => {
          console.log('Registration successful, scope is:', registration.scope)
          getToken(messaging, {
            vapidKey: 'BG5ChKDaZEdyXKWvbgvqU4rZEmbs0_RtY0cv8aJ5njd6Ks2-DgmMYHg63WPiSg0PrtTR8_9bAVwu78GhHL9GclM',
            serviceWorkerRegistration: registration,
          })
            .then(currentToken => {
              if (currentToken) {
                console.log('current token for client: ', currentToken)

                // Track the token -> client mapping, by sending to backend server
                // show on the UI that permission is secured
              } else {
                console.log('No registration token available. Request permission to generate one.')

                // shows on the UI that permission is required
              }
            })
            .catch(err => {
              console.log('An error occurred while retrieving token. ', err)
              // catch error while creating client token
            })
        })
        .catch(err => {
          console.log('Service worker registration failed, error:', err)
        })
    }
  }

  useEffect(() => {
    x()
  }, [])

  useEffect(() => {
    if (accessToken) {
      setIsLoggedIn(true)
      router.push('/home')
    } else {
      ResetToken()
      router.push('/')
    }
  }, [])

  return <>{isLoggedIn ? <Home /> : <Login />}</>
}

export default App
