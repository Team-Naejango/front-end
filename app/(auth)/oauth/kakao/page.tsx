'use client'

import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { ApiError } from 'next/dist/server/api-utils'

import { kakaoLogin } from '@/app/apis/domain/auth/auth'
import { PassLoginForm } from '@/app/apis/types/domain/auth/auth'
import Loading from '@/app/loading'
import { useRecoilState } from 'recoil'
import { kakaoAccessToken, userInfoState } from '@/app/store/atom'
import * as QueryString from 'querystring'
import axios from 'axios'
import { KAKAO_AUTH_REDIRECT_URL } from '@/app/libs/client/constants/apiKey'

const KAKAO_TOKEN_URL = 'https://kauth.kakao.com/oauth/token'

const KakaoCallback = () => {
  const router = useRouter()
  const [serchParams, setSearchParams] = useSearchParams()
  console.log('serchParams:', serchParams[1])

  // 유저정보 스토어에 저장
  const [kakaoUserInfo, setKakaoUserInfo] = useRecoilState(kakaoAccessToken)
  // 토큰정보 스토어에 저장
  const [accessToken, setAccessToken] = useRecoilState(userInfoState)

  // serchParams을 유저 스토어에 저장한 후 카카오 로그인 api를 통해서 백엔드로 인가
  // get으로 백엔드에서 토큰 받아서 토큰 스토어에 저장

  // 카카오 로그인
  const { mutate: mutateKakaoLogin } = useMutation((params: PassLoginForm) => kakaoLogin(params), {
    onSuccess: data => {
      if (data.success) {
        const tokenInfo = {
          refreshToken: data.auth.refreshToken,
          accessToken: data.auth.accessToken,
        }
        /**
         * 1. tokenInfo값을 스토어에 저장
         * 2. 로컬 or 세션에 저장
         *
         * */
        router.push('/')
      }
    },
    onError: (error: ApiError) => {
      console.log('error:', error)
    },
  })

  // 카카오 access_token 요청
  const getKakaoToken = () => {
    fetch(KAKAO_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      body: QueryString.stringify({
        grant_type: 'authorization_code',
        // client_id: 백엔드 API,
        redirect_uri: KAKAO_AUTH_REDIRECT_URL,
        code: serchParams,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log('data:', data)

        if (data?.access_token) {
          setAccessToken(data.access_token)
          localStorage.setItem('token_for_kakaotalk', data.access_token)
          // mutateKakaoLogin({
          //   access_token: data.access_token,
          // })

          // 카카오 유저 정보 get
          axios
            .get('https://kapi.kakao.com/v2/user/me', {
              headers: {
                Authorization: `Bearer ${data.access_token}`,
              },
            })
            .then(() => {
              // userInfoState(data.data.body)
              router.push('/')
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
