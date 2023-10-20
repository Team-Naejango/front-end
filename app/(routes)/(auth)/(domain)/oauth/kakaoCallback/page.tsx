'use client'

import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AxiosError } from 'axios'
import { useSetRecoilState } from 'recoil'

import Loading from '@/app/loading'
import { accessTokenState } from '@/app/store/auth'
import { LOGIN_STATUS } from '@/app/libs/client/constants/code'

import { refresh } from '@/app/apis/domain/auth/auth'

const KakaoCallback = () => {
  const router = useRouter()
  const serchParams = useSearchParams()
  const setAccessToken = useSetRecoilState<string | undefined>(accessTokenState)

  const loginStatus = serchParams.get('loginStatus')

  // 회원 조건별 리다이렉팅
  useEffect(() => {
    const redirectUser = async () => {
      try {
        const accessToken = refresh()

        accessToken.then(response => {
          setAccessToken(response.data.result)
          const hasLoggedIn = loginStatus === LOGIN_STATUS.가입한유저 || loginStatus === LOGIN_STATUS.로그인유저

          if (hasLoggedIn) {
            return router.push('/home')
          }
          return router.push('/sign')
        })
      } catch (error) {
        if (error instanceof AxiosError) {
          return Promise.reject(error)
        }
      }
    }
    redirectUser()
  }, [])

  return <Loading />
}

export default KakaoCallback
