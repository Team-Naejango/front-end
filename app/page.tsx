'use client'

import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useSetRecoilState } from 'recoil'
import { useRouter } from 'next/navigation'

import { accessTokenState } from '@/app/store/auth'
import Login from '@/app/(routes)/(auth)/(domain)/login/page'

import { refresh } from '@/app/apis/domain/auth/auth'

const App: NextPage = () => {
  const router = useRouter()
  const setNewAccessToken = useSetRecoilState<string | undefined>(accessTokenState)

  useEffect(() => {
    const _refresh = refresh()

    _refresh
      .then(response => {
        setNewAccessToken(response.data.result)
        router.replace('/home?isLoggedIn=true')
      })
      .catch(error => {
        console.log('리프레시 토큰이 없기 때문', error)
      })
  }, [])

  return <Login />
}

export default App
