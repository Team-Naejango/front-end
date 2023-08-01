'use client'

import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'

import Login from '@/app/(auth)/(main)/login/page'
import Home from '@/app/(home)/(main)/home/page'
import { getCookie } from '@/app/libs/client/utils/cookie'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store/common'
import { useClearSession } from '@/app/hooks/useClearSession'

const App: NextPage = () => {
  const router = useRouter()
  const { ResetToken } = useClearSession()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const accessToken = getCookie(AUTH_TOKEN.접근)

  useEffect(() => {
    if (accessToken) {
      // setIsLoggedIn(true)
      // router.push('/home')
    } else {
      // ResetToken()
      // router.push('/')
    }
  }, [])

  return <>{isLoggedIn ? <Home /> : <Login />}</>
}

export default App
