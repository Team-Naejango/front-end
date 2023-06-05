'use client'

import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { ApiError } from 'next/dist/server/api-utils'

import { kakaoLogin } from '@/app/apis/domain/auth/auth'
import { PassLoginForm } from '@/app/apis/types/domain/auth/auth'
import Loading from '@/app/loading'

const KAKAO_TOKEN_URL = 'https://kauth.kakao.com/oauth/token'

const KakaoCallback = () => {
  const router = useRouter()
  const [serchParams, setSearchParams] = useSearchParams()
  console.log('serchParams:', serchParams[1])

  // 유저정보 스토어에 저장
  // 토큰정보 스토어에 저장

  // 카카오 로그인
  // const { mutate: mutateKakaoLogin } = useMutation((params: PassLoginForm) => kakaoLogin(params), {
  //   onSuccess: data => {
  //     if (data.success) {
  //       const tokenInfo = {
  //         refreshToken: data.auth.refreshToken,
  //         accessToken: data.auth.accessToken,
  //       }
  //       /**
  //        * 1. tokenInfo값을 스토어에 저장
  //        * 2. 로컬 or 세션에 저장
  //        *
  //        * */
  //     }
  //   },
  //   onError: (error: ApiError) => {
  //     console.log('error:', error)
  //   },
  // })

  // 카카오 access_token 요청
  const getKakaoToken = () => {
    fetch(KAKAO_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then(res => res.json())
      .then(data => {
        if (data?.access_token) {
          kakaoLogin({
            access_token: data.access_token,
          })
        }
      })
  }

  useEffect(() => {
    getKakaoToken()
  }, [])

  return <Loading />
}

export default KakaoCallback
