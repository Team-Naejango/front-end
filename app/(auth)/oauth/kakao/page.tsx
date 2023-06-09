'use client'

import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { ApiError } from 'next/dist/server/api-utils'

import Loading from '@/app/loading'
import { kakaoLogin, kakaoToken, kakaoUserInfo } from '@/app/apis/domain/auth/auth'
import { kakaoAccessToken, userInfoState } from '@/app/store/atom'
import { KAKAO_AUTH_REDIRECT_URL } from '@/app/libs/client/constants/apiKey'
import { KakaoLoginToken } from '@/app/apis/types/domain/auth/auth'
import { setDeadlineCookie } from '@/app/libs/client/utils/cookie'
import { KAKAO_AUTH_TOKEN } from '@/app/libs/client/constants/store'

const KAKAO_TOKEN_URL = 'https://kauth.kakao.com/oauth/token'
const KAKAO_USER_INFO_URL = 'https://kapi.kakao.com/v2/user/me'

export interface kakaoParams {
  grant_type: string
  client_id: string
  redirect_uri: string
  code: string[]
}

const KakaoCallback = () => {
  const router = useRouter()
  const [serchParams] = useSearchParams()
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const [accessToken, setAccessToken] = useRecoilState(kakaoAccessToken)

  console.log('serchParams:', serchParams[1])

  // serchParams을 유저 스토어에 저장한 후 카카오 로그인 api를 통해서 백엔드로 인가
  // get으로 백엔드에서 토큰 받아서 토큰 스토어에 저장

  // 카카오 로그인
  const { mutate: mutateKakaoLogin } = useMutation((params: KakaoLoginToken) => kakaoLogin(params), {
    onSuccess: data => {
      if (data.auth.accessToken) {
        setAccessToken(data.auth.accessToken)

        router.push('/')
      }
    },
    onError: (error: ApiError) => {
      // console.log('error:', error)
      return Promise.reject(error)
    },
  })

  // 카카오 유저정보
  const { mutate: mutateKakaoUserInfo } = useMutation(
    (accessToken: string) => kakaoUserInfo(KAKAO_USER_INFO_URL, accessToken),
    {
      onSuccess: data => {
        if (data.auth.member) {
          setUserInfo(data.auth.member)
        }
      },
      onError: (error: ApiError) => {
        return Promise.reject(error)
      },
    }
  )

  // 카카오 토큰
  const { mutate: mutateKakaoToken } = useMutation(
    (params: kakaoParams | string) => kakaoToken(KAKAO_TOKEN_URL, params),
    {
      onSuccess: data => {
        if (data.token.refreshToken) {
          setDeadlineCookie(KAKAO_AUTH_TOKEN.갱신, data.token.refreshToken)

          // 카카오 유저정보 접근
          mutateKakaoUserInfo(data.token.accessToken)

          // 카카오 로그인 시도
          mutateKakaoLogin({
            // todo: 회원가입 type 정보
            type: '',
            accessToken: data.token.accessToken,
          })
        }
      },
      onError: (error: ApiError) => {
        return Promise.reject(error)
      },
    }
  )

  // 카카오 토큰 요청
  const getKakaoToken = () => {
    const params: kakaoParams = {
      grant_type: 'authorization_code',
      client_id: '백엔드 api url',
      redirect_uri: KAKAO_AUTH_REDIRECT_URL,
      code: serchParams,
    }
    mutateKakaoToken(JSON.stringify(params))
  }

  useEffect(() => {
    getKakaoToken()
  }, [])

  return <Loading />
}

export default KakaoCallback
