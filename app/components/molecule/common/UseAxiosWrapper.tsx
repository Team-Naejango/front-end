'use client'

import React, { ReactNode, useEffect } from 'react'
import { AxiosHeaders, AxiosRequestConfig, AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios'
import { useRecoilState } from 'recoil'

import { withAuth } from '@/app/apis/config/axios/instance/withAuth'
import { TokenValid } from '@/app/libs/client/utils/token'
import { accessTokenStore } from '@/app/store/atom'

const UseAxiosWrapper = ({ children }: { children: ReactNode }) => {
  const [newAccessToken, setNewAccessToken] = useRecoilState<string>(accessTokenStore)

  useEffect(() => {
    const requestInterceptor = withAuth.interceptors.request.use(
      async (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
        if (!config.headers) {
          config.headers = {} as AxiosHeaders
        }

        const isHasToken = await TokenValid()
        const newAccessToken = String(config.headers.Authorization).split(' ')[1]

        setNewAccessToken(newAccessToken)

        if (isHasToken) {
          config.headers = {
            Authorization: `Bearer ${newAccessToken}`,
          } as AxiosRequestHeaders
        }

        return config
      },
      () => newAccessToken,
      { synchronous: true }
    )

    return () => {
      withAuth.interceptors.request.eject(requestInterceptor)
    }
  }, [])

  return <>{children}</>
}

export default UseAxiosWrapper
