'use client'

import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { useRecoilValue } from 'recoil'

import Login from '@/app/(routes)/(auth)/(domain)/login/page'
import Home from '@/app/(routes)/(withAuth)/(domain)/home/home'
import { useClearSession } from '@/app/hooks/useClearSession'
import { accessTokenState } from '@/app/store/auth'

const App: NextPage = () => {
  const router = useRouter()
  const { resetToken } = useClearSession()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const accessToken = useRecoilValue<string | undefined>(accessTokenState)

  useEffect(() => {
    // if (accessToken) {
    //   setIsLoggedIn(true)
    //   router.push('/home')
    // }
    // else {
    //   resetToken()
    //   router.push('/')
    // }
  }, [])

  return <>{isLoggedIn ? <Home /> : <Login />}</>
}

export default App
