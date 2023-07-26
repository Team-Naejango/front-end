'use client'

import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'

import Login from '@/app/(auth)/(main)/login/page'
import Home from '@/app/(home)/(main)/home/page'
import { getCookie, removeCookie } from '@/app/libs/client/utils/cookie'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store/common'

const App: NextPage = () => {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const accessToken = getCookie(AUTH_TOKEN.접근)
  // const accessToken = useRecoilValue(kakaoAccessToken)

  // todo: 관련 url이 아닐 경우 후속처리
  useEffect(() => {
    if (accessToken) {
      setIsLoggedIn(true)
      router.push('/home')
    } else {
      removeCookie(AUTH_TOKEN.갱신)
      router.push('/')
    }
  }, [accessToken, router])

  // todo: wrap 전역 처리
  return <>{isLoggedIn ? <Home /> : <Login />}</>
}

export default App
