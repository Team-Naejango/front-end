'use client'

import React, { ReactNode, useEffect } from 'react'
import { AxiosHeaders, AxiosRequestConfig, AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios'

import { instance } from '@/app/apis/config/axios/instance'
import { TokenValid } from '@/app/libs/client/utils/token'
import { getCookie } from '@/app/libs/client/utils/cookie'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store/common'

const UseAxiosWrapper = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const accessToken = getCookie(AUTH_TOKEN.접근)
    const refreshToken = getCookie(AUTH_TOKEN.갱신)

    const requestInterceptor = instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
        if (!config.headers) {
          config.headers = {} as AxiosHeaders
        }

        const isHasToken = await TokenValid()

        config.headers = {
          'Content-Type': 'application/json',
          Authorization: `${isHasToken ? `Bearer ${accessToken}` : `${refreshToken}`}`,
        } as AxiosRequestHeaders

        return config
      }
    )
    return () => {
      instance.interceptors.request.eject(requestInterceptor)
    }
  }, [])

  return <>{children}</>
}

export default UseAxiosWrapper
