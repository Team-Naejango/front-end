'use client'

import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'

import Loading from '@/app/loading'
import { getCookie, setDeadlineCookie } from '@/app/libs/client/utils/cookie'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store/common'
import { non } from '@/app/apis/domain/auth/auth'
import { KAKAO_AUTH_REDIRECT_URL } from '@/app/libs/client/constants/sdk'

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
    //
    //   console.log('cookie:', typeof document.cookie === 'undefined' ? undefined : document.cookie)
    //   console.log('accessToken:', accessToken)
    //   console.log('refreshToken:', accessToken)
    //   console.log('getCookie', getCookie('AccessToken'))
    //   console.log('setCookie', getCookie('RefreshToken'))
    //   // getToken().then(() => {
    //   //   try {
    //   //     router.push('/sign')
    //   //   } catch (error: unknown) {
    //   //     return Promise.reject(error)
    //   //   }
    //   // })
  }, [])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = fetch(KAKAO_AUTH_REDIRECT_URL, {
  //         method: 'get',
  //         credentials: 'include',
  //       })
  //         .then(response => {
  //           const cookieHeader = response.headers.get('Set-Cookie')
  //           console.log('cookieHeader:', cookieHeader)
  //         })
  //         .then(test => {
  //           console.log('test:', test)
  //           router.push('/sign')
  //         })
  //       // const response = await non() // nonUser API를 호출하여 응답을 받아옵니다.
  //       console.log('response:', response)
  //       // 응답 헤더에서 쿠키 값을 추출합니다.
  //       // const cookieHeader = response.headers.get('Set-Cookie')
  //       // if (cookieHeader) {
  //       //   // 쿠키 값을 추출한 후 ';'로 구분하여 토큰 값을 얻습니다.
  //       //   const token = cookieHeader.split(';')[0].split('=')[1]
  //       //   setDeadlineCookie('AccessToken', token) // 쿠키에 토큰 값을 저장합니다.
  //       // }
  //     } catch (error) {
  //       console.error('Error fetching data:', error)
  //     }
  //   }
  //
  //   fetchData()
  // }, [])

  return <Loading />
}

export default KakaoCallback
