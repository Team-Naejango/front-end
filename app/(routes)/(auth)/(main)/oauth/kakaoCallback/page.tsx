'use client'

import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AxiosError } from 'axios'

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
  }

  let SIGN_STATUS = 'TEMPORAL'
  useEffect(() => {
    getToken().then(() => {
      try {
        loginStatus === SIGN_STATUS ? router.push('/sign') : router.push('/home')
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          return Promise.reject(error)
        }
      }
    })
  }, [])

  return <Loading />
}

export default KakaoCallback
