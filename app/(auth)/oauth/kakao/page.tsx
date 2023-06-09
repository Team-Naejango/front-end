'use client'

import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { ApiError } from 'next/dist/server/api-utils'
import * as QueryString from 'querystring'

import Loading from '@/app/loading'
import { kakaoLogin, kakaoToken, kakaoUserInfo } from '@/app/apis/domain/auth/auth'
import { kakaoAccessToken, userInfoState } from '@/app/store/atom'
import { KAKAO_AUTH_REDIRECT_URL } from '@/app/libs/client/constants/apiKey'
import { instance } from '@/app/apis/config/axios'
import { AuthToken, KakaoLoginToken } from '@/app/apis/types/domain/auth/auth'

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
  const [serchParams, setSearchParams] = useSearchParams()
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const [accessToken, setAccessToken] = useRecoilState(kakaoAccessToken)

  console.log('serchParams:', serchParams[1])

  // serchParams을 유저 스토어에 저장한 후 카카오 로그인 api를 통해서 백엔드로 인가
  // get으로 백엔드에서 토큰 받아서 토큰 스토어에 저장

  // 카카오 로그인
  const { mutate: mutateKakaoLogin } = useMutation((params: KakaoLoginToken) => kakaoLogin(params), {
    onMutate: () => {},
    onSuccess: data => {
      if (data.success) {
        const tokenInfo = {
          // refreshToken: data.auth.refreshToken,
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
      // console.log('error:', error)
      return Promise.reject(error)
    },
  })

  const { mutate: mutateKakaoUserInfo } = useMutation(
    (accessToken: string) => kakaoUserInfo(KAKAO_USER_INFO_URL, accessToken),
    {
      onSuccess: data => {
        setUserInfo(data.auth.member.member)
        router.push('/')
      },
      onError: (error: ApiError) => {
        return Promise.reject(error)
      },
    }
  )

  const { mutate: mutateKakaoParams } = useMutation(
    (params: kakaoParams | string) => kakaoToken(KAKAO_TOKEN_URL, params),
    {
      onSuccess: data => {
        if (data?.token.accessToken) {
          setAccessToken(data.token.accessToken)
          // localStorage.setItem('token_for_kakaotalk', data.access_token)

          mutateKakaoLogin({
            // todo: 회원가입 type 정보
            type: '',
            accessToken: data.token.accessToken,
          })

          // 카카오 유저 정보 get
          mutateKakaoUserInfo(data.token.accessToken)
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
    mutateKakaoParams(JSON.stringify(params))
  }

  // // 카카오 토큰 요청
  // const getKakaoToken = () => {
  //   const params: kakaoParams = {
  //     grant_type: 'authorization_code',
  //     client_id: '백엔드 api url',
  //     redirect_uri: KAKAO_AUTH_REDIRECT_URL,
  //     code: serchParams,
  //   }
  //   mutateKakaoParams(JSON.stringify(params))
  //
  //   fetch(KAKAO_TOKEN_URL, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
  //     body: QueryString.stringify({
  //       grant_type: 'authorization_code',
  //       // client_id: 백엔드 api url,
  //       redirect_uri: KAKAO_AUTH_REDIRECT_URL,
  //       code: serchParams,
  //     }),
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log('data:', data)
  //
  //       if (data?.access_token) {
  //         setAccessToken(data.access_token)
  //         // localStorage.setItem('token_for_kakaotalk', data.access_token)
  //         mutateKakaoLogin({
  //           access_token: data.access_token,
  //         })
  //
  //         // 카카오 유저 정보 get
  //         instance
  //           .get('https://kapi.kakao.com/v2/user/me', {
  //             headers: {
  //               Authorization: `Bearer ${data.access_token}`,
  //             },
  //           })
  //           .then(() => {
  //             // userInfoState(data.data.body)
  //             router.push('/')
  //           })
  //       }
  //     })
  // }

  useEffect(() => {
    getKakaoToken()
  }, [])

  return <Loading />
}

export default KakaoCallback
