'use client'

import React, { useEffect } from 'react'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import Loading from '@/app/loading'
import { kakao2, kakao3, kakaoLogin, kakaoUserInfo } from '@/app/apis/domain/auth/auth'
import { kakaoAccessToken, userInfoState } from '@/app/store/atom'
import { OAUTH } from '@/app/libs/client/reactQuery/queryKey'
import { setDeadlineCookie } from '@/app/libs/client/utils/cookie'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store'
import { KakaoLoginToken } from '@/app/apis/types/domain/auth/auth'
import axios from 'axios'

const KAKAO_USER_INFO_URL = 'https://kapi.kakao.com/v2/user/me'

export interface KakaoParams {
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
  console.log('serchParams:', serchParams)
  console.log('serchParams:', serchParams[1].split('refreshToken=')[1])

  // // 카카오 유저정보 조회
  // const { data: { loginInfo, success: isReadUser } = {} } = useQuery(
  //   [OAUTH.카카오유저정보, accessToken, userInfo],
  //   () => kakaoUserInfo(KAKAO_USER_INFO_URL, accessToken),
  //   {
  //     enabled: !!accessToken,
  //   }
  // )

  const { data, isLoading, isError } = useQuery(['kakaoToken', serchParams], () => kakao2(serchParams[1]))

  // const { data: dat } = useQuery(['kakaoToken2'], () => kakao3())

  console.log('data:', data)

  // const x = () => {
  //   axios
  //     .get(`http://43.202.25.203:8080//login/oauth2/code/kakao?code=${serchParams[1]}`, {
  //       headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'x-access-token': },
  //     })
  //     .then(response => {
  //       // 받아온 JSON 데이터를 처리하는 코드를 작성합니다.
  //       console.log('response.data:', response.data)
  //     })
  //     .catch(error => {
  //       // 에러 처리 코드를 작성합니다.
  //       console.error(error)
  //     })
  // }

  // 토큰 발급
  // const getToken = async () => {
  //   setDeadlineCookie(AUTH_TOKEN.인가, serchParams[1])
  //
  //   // await kakao2(serchParams[1]).then(data => {
  //   //   console.log('datadata:', data)
  //   // })
  //
  //   /**
  //    * @todo: authAxios와 notAuthAXios 구분하기
  //    * @extends notAuthAXios는 api 요청 시 인가코드를 사용하기 때문
  //    * */
  //   await kakaoLogin(serchParams[1]).then(response => {
  //     try {
  //       console.log('response:', response)
  //       if (response) {
  //         setAccessToken(response.data.accessToken)
  //         setDeadlineCookie(AUTH_TOKEN.갱신, response.data.refreshToken)
  //
  //         if (response.data.new) {
  //           router.push('/sign')
  //         }
  //       }
  //     } catch (error: unknown) {
  //       console.log('error:', error)
  //       // return Promise.reject(error)
  //     }
  //   })
  // }

  useEffect(() => {
    // getToken()
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
