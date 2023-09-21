'use client'

import React, { ReactNode, useEffect } from 'react'
import { AxiosHeaders, AxiosRequestConfig, AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

import { withAuth } from '@/app/apis/config/axios/instance/withAuth'
import { TokenValid } from '@/app/libs/client/utils/token'
import { getCookie } from '@/app/libs/client/utils/cookie'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store/common'
import { useClearSession } from '@/app/hooks/useClearSession'

const UseAxiosWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const { resetToken } = useClearSession()

  useEffect(() => {
    const requestInterceptor = withAuth.interceptors.request.use(
      async (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
        if (!config.headers) {
          config.headers = {} as AxiosHeaders
        }

        const isHasToken = await TokenValid()

        if (isHasToken) {
          const accessToken = getCookie(AUTH_TOKEN.접근)

          config.headers = {
            Authorization: `Bearer ${accessToken}`,
          } as AxiosRequestHeaders
        }
        // else {
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
