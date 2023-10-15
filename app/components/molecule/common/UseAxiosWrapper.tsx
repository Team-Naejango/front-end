'use client'

import React, { ReactNode, useEffect } from 'react'
import { AxiosHeaders, AxiosRequestConfig, AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import { withAuth } from '@/app/apis/config/axios/instance/withAuth'
import { IsTokenValid } from '@/app/libs/client/utils/token'
import { accessTokenSelector, accessTokenState } from '@/app/store/auth'
import { useClearSession } from '@/app/hooks/useClearSession'

import { refresh } from '@/app/apis/domain/auth/auth'

const authExceptPaths = ['login', 'sign', 'findEmail', 'findPassword', 'oauth/kakaoLogin', 'oauth/kakaoCallback']

const UseAxiosWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const { resetToken } = useClearSession()

  const setNewAccessToken = useSetRecoilState<string | undefined>(accessTokenState)
  const accessToken = useRecoilValue<string | undefined>(accessTokenSelector)

  useEffect(() => {
    // 요청 예외처리
    const requestInterceptor = withAuth.interceptors.request.use(
      async (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
        if (!config.headers) {
          config.headers = {} as AxiosHeaders
        }

        const isAuthNeeded = config.url && !authExceptPaths.includes(config.url)
        if (!isAuthNeeded) {
          return config
        }

        const hasToken = IsTokenValid()

        if (!hasToken) {
          if (accessToken) {
            config.headers = {
              Authorization: `Bearer ${accessToken}`,
            } as AxiosRequestHeaders
          } else {
            const response = await refresh()

            setNewAccessToken(response.data.result)
            config.headers = {
              Authorization: `Bearer ${response.data.result}`,
            } as AxiosRequestHeaders
          }
        } else {
          resetToken()
          toast.error('로그인 세션이 만료되었습니다. 다시 로그인 해주세요.')
          router.replace('login')
        }

        return config
      },

      undefined,
      { synchronous: true }
    )

    // 응답 예외처리
    const responseInterceptor = withAuth.interceptors.response.use(
      response => response,
      error => {
        if (!error.headers) {
          error.headers = {} as AxiosHeaders
        }

        if (error.response.data.status === 401) {
          setNewAccessToken(error.response.data.reissuedAccessToken)
          error.headers = {
            Authorization: `Bearer ${error.response.data.reissuedAccessToken}`,
          } as AxiosRequestHeaders

          return withAuth.request(error.config)
        }

        return Promise.reject(error)
      }
    )

    return () => {
      withAuth.interceptors.request.eject(requestInterceptor)
      withAuth.interceptors.request.eject(responseInterceptor)
    }
  }, [accessToken])

  return <React.Suspense>{children}</React.Suspense>
}

export default UseAxiosWrapper
