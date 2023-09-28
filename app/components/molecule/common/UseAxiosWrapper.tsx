'use client'

import React, { ReactNode, useEffect } from 'react'
import { AxiosHeaders, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { useSetRecoilState } from 'recoil'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

import { withAuth } from '@/app/apis/config/axios/instance/withAuth'
import { TokenValid } from '@/app/libs/client/utils/token'
import { useClearSession } from '@/app/hooks/useClearSession'
import { accessTokenStore } from '@/app/store/atom'

const UseAxiosWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const { resetToken } = useClearSession()
  const setAccessTokenState = useSetRecoilState<string>(accessTokenStore)

  useEffect(() => {
    const requestInterceptor = withAuth.interceptors.request.use(
      async (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
        if (!config.headers) {
          config.headers = {} as AxiosHeaders
        }

        const isHasToken = await TokenValid()

        const accessToken = String(config.headers.Authorization).split(' ')[1]

        if (!isHasToken) {
          setAccessTokenState(accessToken)
        }
        // else if (accessToken === undefined) {
        //   resetToken()
        //   toast.error('로그인 세션이 만료되었습니다. 다시 로그인해주세요.')
        //   router.replace('/login')
        // }

        return config
      },
      undefined,
      { synchronous: true }
    )

    return () => {
      withAuth.interceptors.request.eject(requestInterceptor)
    }
  }, [])

  return <>{children}</>
}

export default UseAxiosWrapper
