'use client'

import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'

import Loading from '@/app/loading'
import { getCookie, setDeadlineCookie } from '@/app/libs/client/utils/cookie'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store/common'

const KakaoCallback = () => {
  const router = useRouter()
  const serchParams = useSearchParams()

  const accessToken = serchParams.get('AccessToken')
  const refreshToken = serchParams.get('RefreshToken')

  // 토큰 발급
  const getToken = async () => {
    setDeadlineCookie(AUTH_TOKEN.접근, accessToken)
    setDeadlineCookie(AUTH_TOKEN.갱신, refreshToken)
  }

  useEffect(() => {
    router.push('/sign')

    console.log('accessToken:', accessToken)
    console.log('refreshToken:', accessToken)
    console.log('getCookie', getCookie('AccessToken'))
    console.log('setCookie', getCookie('RefreshToken'))
    // getToken().then(() => {
    //   try {
    //     router.push('/sign')
    //   } catch (error: unknown) {
    //     return Promise.reject(error)
    //   }
    // })
  }, [])

  return <Loading />
}

export default KakaoCallback
