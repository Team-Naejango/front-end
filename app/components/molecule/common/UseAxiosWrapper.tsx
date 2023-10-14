'use client'

import React, { ReactNode, useEffect } from 'react'
import { AxiosHeaders, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import { withAuth } from '@/app/apis/config/axios/instance/withAuth'
import { isTokenValid } from '@/app/libs/client/utils/token'
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
    const requestInterceptor = withAuth.interceptors.request.use(
      async (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
        if (!config.headers) {
          config.headers = {} as AxiosHeaders
        }

        const isAuthNeeded = config.url && !authExceptPaths.includes(config.url)
        if (!isAuthNeeded) {
          return config
        }

        const hasToken = await isTokenValid()

        if (!hasToken) {
          if (config.data?.data.error === 401) {
            const response = await refresh()

            setNewAccessToken(response.data.result)

            config.headers = {
              Authorization: `Bearer ${response.data.result}`,
            } as AxiosRequestHeaders
          }

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

    // const responseInterceptor = withAuth.interceptors.response.use(
    //   async (config: AxiosResponse) => {
    //     if (!config.headers) {
    //       config.headers = {} as AxiosHeaders
    //     }
    //
    //     console.log('config:', config)
    //
    //     const hasToken = await isTokenValid()
    //     console.log('hasToken:', hasToken)
    //
    //     if (!hasToken) {
    //       if (config.data.error === 401) {
    //         const response = await refresh()
    //
    //         setNewAccessToken(response.data.result)
    //
    //         config.headers = {
    //           Authorization: `Bearer ${response.data.result}`,
    //         } as AxiosRequestHeaders
    //       }
    //     } else {
    //       resetToken()
    //       toast.error('로그인 세션이 만료되었습니다. 다시 로그인 해주세요.')
    //       router.replace('login')
    //     }
    //
    //     return config
    //   },
    //
    //   undefined,
    //   { synchronous: false }
    // )

    return () => {
      withAuth.interceptors.request.eject(requestInterceptor)
      // withAuth.interceptors.request.eject(responseInterceptor)
    }
  }, [accessToken])

  return <React.Suspense>{children}</React.Suspense>
}

export default UseAxiosWrapper
