'use client'

import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { AxiosError } from 'axios'
import { useSetRecoilState } from 'recoil'
import { useRouter } from 'next/navigation'

import { accessTokenState } from '@/app/store/auth'
import Login from '@/app/(routes)/(auth)/(domain)/login/page'

import { refresh } from '@/app/apis/domain/auth/auth'

const App: NextPage = () => {
  const router = useRouter()
  const setNewAccessToken = useSetRecoilState<string | undefined>(accessTokenState)

  useEffect(() => {
    try {
      const _refresh = refresh()

      _refresh.then(response => {
        setNewAccessToken(response.data.result)
        router.replace('/home?isLoggedIn=true')
      })
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log('토큰 재발급 에러:', error)
      }
    }
  }, [])

  return <Login />
}

export default App
