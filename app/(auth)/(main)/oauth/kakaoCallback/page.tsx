'use client'

import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSetRecoilState } from 'recoil'

import Loading from '@/app/loading'
import { kakaoAccessToken } from '@/app/store/atom'
import { setDeadlineCookie } from '@/app/libs/client/utils/cookie'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store'
import { kakaoLogin } from '@/app/apis/domain/auth/auth'
import { KakaoLoginToken } from '@/app/apis/types/domain/auth/auth'

const KakaoCallback = () => {
  const router = useRouter()
  const serchParams = useSearchParams()
  const setAccessToken = useSetRecoilState(kakaoAccessToken)

  const accessTokenParam = serchParams.get('accessToken')
  const refreshTokenParam = serchParams.get('refreshToken')

  console.log('accessTokenParam:', accessTokenParam)
  console.log('refreshTokenParam:', refreshTokenParam)

  // 토큰 발급
  // const getToken = async () => {
  // /**
  //  * @todo: authAxios와 notAuthAXios 구분하기
  //  * @extends notAuthAXios는 api 요청 시 인가코드를 사용하기 때문
  //  * */
  // await kakaoLogin(serchParams[1]).then(response => {
  //   try {
  //     console.log('response:', response)
  //     if (response) {
  //       setAccessToken(response.data.accessToken)
  //       setDeadlineCookie(AUTH_TOKEN.갱신, response.data.refreshToken)
  //
  //       if (response.data.new) {
  //         router.push('/sign')
  //       }
  //     }
  //   } catch (error: unknown) {
  //     console.log('error:', error)
  //     // return Promise.reject(error)
  //   }
  // })
  // }

  // 토큰 발급
  const getToken = async () => {
    setDeadlineCookie(AUTH_TOKEN.인가, accessTokenParam)

    setAccessToken(accessTokenParam)
    setDeadlineCookie(AUTH_TOKEN.갱신, refreshTokenParam)
  }

  useEffect(() => {
    getToken().then(() => {
      try {
        router.push('/sign')
      } catch (error: unknown) {
        return Promise.reject(error)
      }
    })

    // setAccessToken(accessTokenParam)
    // setDeadlineCookie(AUTH_TOKEN.갱신, refreshTokenParam)
  }, [])

  return <Loading />
}

export default KakaoCallback
