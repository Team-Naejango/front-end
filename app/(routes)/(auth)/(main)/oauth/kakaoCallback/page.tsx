'use client'

import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Loading from '@/app/loading'
import { setDeadlineCookie } from '@/app/libs/client/utils/cookie'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store/common'

const KakaoCallback = () => {
  const router = useRouter()
  const serchParams = useSearchParams()

  const accessToken = serchParams.get('accessToken')
  const loginStatus = serchParams.get('loginStatus')

  // 토큰 발급
  const getToken = async () => {
    setDeadlineCookie(AUTH_TOKEN.접근, accessToken)
    // setDeadlineCookie(AUTH_TOKEN.갱신, refreshToken)
  }

  let SIGNSTATUS = 'TEMPORAL'
  useEffect(() => {
    getToken().then(() => {
      try {
        loginStatus === SIGNSTATUS ? router.push('/sign') : router.push('/home')
      } catch (error: unknown) {
        return Promise.reject(error)
      }
    })
  }, [])

  return <Loading />
}

export default KakaoCallback
