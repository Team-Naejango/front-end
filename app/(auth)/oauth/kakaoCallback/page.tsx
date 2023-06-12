'use client'

import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { ApiError } from 'next/dist/server/api-utils'

import Loading from '@/app/loading'
import { kakaoLogin, kakaoToken, kakaoUserInfo } from '@/app/apis/domain/auth/auth'
import { kakaoAccessToken, userInfoState } from '@/app/store/atom'
import { KAKAO_AUTH_REDIRECT_URL } from '@/app/libs/client/constants/apiKey'
import { setDeadlineCookie } from '@/app/libs/client/utils/cookie'
import { KAKAO_AUTH_TOKEN } from '@/app/libs/client/constants/store'
import { OAUTH } from '@/app/libs/client/reactQuery/queryKey'

const KAKAO_TOKEN_URL = 'https://kauth.kakao.com/oauth/token'
const KAKAO_USER_INFO_URL = 'https://kapi.kakao.com/v2/user/me'

export interface kakaoParams {
  grant_type: string
  client_id?: string
  redirect_uri: string
  code: string[]
}

const KakaoCallback = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [serchParams] = useSearchParams()
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const [accessToken, setAccessToken] = useRecoilState(kakaoAccessToken)
  console.log('serchParams:', serchParams)
  // @todo: serchParams을 유저 스토어에 저장을 따로 한 후에 카카오 로그인 api를 통해서 백엔드로 인가 해야하는가?

  // 카카오 유저정보 조회
  const { data: { loginInfo } = {} } = useQuery(
    [OAUTH.카카오유저정보, accessToken, userInfo],
    () => kakaoUserInfo(KAKAO_USER_INFO_URL, accessToken),
    {
      enabled: !!accessToken,
    }
  )

  // 카카오 로그인 인가코드
  const { mutate: mutateAuthorization } = useMutation((serchParams: string) => kakaoLogin(serchParams))

  // 토큰 발급
  const { mutate: mutateToken } = useMutation((params: kakaoParams | string) => kakaoToken(KAKAO_TOKEN_URL, params), {
    onSuccess: data => {
      if (data.token) {
        setDeadlineCookie(KAKAO_AUTH_TOKEN.갱신, data.token.refreshToken)
        setAccessToken(data.token.accessToken)
        queryClient.invalidateQueries([OAUTH.카카오유저정보])

        router.push('/sign')
      }
    },
    onError: (error: ApiError) => {
      // router.push('/')
      // todo: 실패알림 팝업 추가
      return Promise.reject(error)
    },
  })

  // 카카오 로그인 요청
  const kakaoUserLogin = async () => {
    const params: kakaoParams = {
      grant_type: 'authorization_code',
      client_id: process.env.KAKAOTALK_REST_API_KEY,
      redirect_uri: KAKAO_AUTH_REDIRECT_URL,
      code: serchParams,
    }
    await mutateAuthorization(serchParams[1])
    await mutateToken(JSON.stringify(params))
  }

  useEffect(() => {
    console.log('test:', serchParams)
    kakaoUserLogin()
  }, [])

  // 유저정보 조회 성공 후
  useEffect(() => {
    if (loginInfo) {
      setUserInfo(loginInfo.member)
    }
  }, [loginInfo, setUserInfo])

  return <Loading />
}

export default KakaoCallback
