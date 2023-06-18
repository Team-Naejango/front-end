'use client'

import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import Loading from '@/app/loading'
import { kakaoLogin, kakaoUserInfo } from '@/app/apis/domain/auth/auth'
import { kakaoAccessToken, userInfoState } from '@/app/store/atom'
import { OAUTH } from '@/app/libs/client/reactQuery/queryKey'
import { setDeadlineCookie } from '@/app/libs/client/utils/cookie'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store'
import { KakaoLoginToken } from '@/app/apis/types/domain/auth/auth'

const KAKAO_USER_INFO_URL = 'https://kapi.kakao.com/v2/user/me'

export interface kakaoParams {
  grant_type: string
  client_id: string | undefined
  redirect_uri: string
  code: string
}

const KakaoCallback = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [serchParams] = useSearchParams()
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const [accessToken, setAccessToken] = useRecoilState(kakaoAccessToken)
  console.log('serchParams:', serchParams[1])

  // // 카카오 유저정보 조회
  // const { data: { loginInfo, success: isReadUser } = {} } = useQuery(
  //   [OAUTH.카카오유저정보, accessToken, userInfo],
  //   () => kakaoUserInfo(KAKAO_USER_INFO_URL, accessToken),
  //   {
  //     enabled: !!accessToken,
  //   }
  // )

  // 토큰 발급
  const getToken = async () => {
    setDeadlineCookie(AUTH_TOKEN.인가, serchParams[1])
    /**
     * @todo: authAxios와 notAuthAXios 구분하기
     * @extends notAuthAXios는 api 요청 시 인가코드를 사용하기 때문
     * */
    await kakaoLogin(serchParams[1]).then(response => {
      try {
        console.log('response:', response)
        if (response) {
          setAccessToken(response.data.accessToken)
          setDeadlineCookie(AUTH_TOKEN.갱신, response.data.refreshToken)

          if (response.data.new) {
            router.push('/sign')
          }
        }
      } catch (error: unknown) {
        console.log('error:', error)
        // return Promise.reject(error)
      }
    })
  }

  useEffect(() => {
    getToken()
  }, [])

  // 유저정보 조회 성공 후
  // useEffect(() => {
  //   if (isReadUser) {
  //     setUserInfo(loginInfo!.member)
  //   }
  // }, [isReadUserSuccess, loginInfo, setUserInfo])

  return <Loading />
}

export default KakaoCallback
