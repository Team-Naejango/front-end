'use client'

import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { AxiosError } from 'axios'
import { useRecoilState } from 'recoil'
import { useRouter } from 'next/navigation'

import { accessTokenState } from '@/app/store/auth'
import Login from '@/app/(routes)/(auth)/(domain)/login/page'
import Home from '@/app/(routes)/(withAuth)/(domain)/home/home'

import { refresh } from '@/app/apis/domain/auth/auth'

const App: NextPage = () => {
  const router = useRouter()
  const [newAccessToken, setNewAccessToken] = useRecoilState<string | undefined>(accessTokenState)

  useEffect(() => {
    try {
      const _refresh = refresh()

      _refresh.then(response => {
        console.log('rresponse:', response.data.result)
        setNewAccessToken(response.data.result)
        router.replace('/home?isLoggedIn=true')
      })
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log('error:', error)
      }
    }
  }, [])

  return newAccessToken ? <Home /> : <Login />
}

export default App
