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

  const LOGIN_STATUS = ['TEMPORAL', 'USER', 'already_logged_in']
  useEffect(() => {
    getToken().then(() => {
      try {
        if (loginStatus === LOGIN_STATUS[0]) {
          router.push('/sign')
        } else if (loginStatus === LOGIN_STATUS[1]) {
          router.push('/home')
        } else if (loginStatus === LOGIN_STATUS[2]) {
          router.push('/home')
        }
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
