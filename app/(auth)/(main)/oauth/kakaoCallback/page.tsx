'use client'

import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Loading from '@/app/loading'
import { getCookie, setDeadlineCookie } from '@/app/libs/client/utils/cookie'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store/common'
import { sign } from '@/app/apis/domain/auth/auth'
import axios from 'axios'

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

  // api get 요청 후 바디로 받기
  useEffect(() => {
    // getToken()
    // axios
    //   .get('http://43.202.25.203:8080/api/user/profile', {
    //     withCredentials: true,
    //   })
    //   .then(response => {
    //     console.log('response:', response)
    //   })
    //   .catch(error => {
    //     console.log('error:', error)
    //   })

    router.push('/sign')

    // console.log('accessToken:', accessToken)
    // console.log('refreshToken:', accessToken)
    // console.log('getCookie', getCookie('AccessToken'))
    // console.log('setCookie', getCookie('RefreshToken'))
    // console.log('test:', document.cookie)
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
