'use client'

import React, { ReactNode, useEffect } from 'react'
import { AxiosHeaders, AxiosRequestConfig, AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios'
import { useRecoilValue } from 'recoil'

import { instance } from '@/app/apis/config/axios/instance'
import { TokenValid } from '@/app/libs/client/utils/token'
import { kakaoAccessToken } from '@/app/store/atom'

const UseAxiosWrapper = ({ children }: { children: ReactNode }) => {
  const accessToken = useRecoilValue(kakaoAccessToken)

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
        if (!config.headers) {
          config.headers = {} as AxiosHeaders
        }

        const isHasToken = await TokenValid()

        console.log('isHasToken:', isHasToken)
        console.log('accessTokenaccessToken:', accessToken)

        // if (!isHasToken) {
        config.headers = {
          'Content-Type': 'application/json',
          Authorization: accessToken,
        } as AxiosRequestHeaders
        // }
        return config
      }
    )

    return () => {
      instance.interceptors.request.eject(requestInterceptor)
    }
  }, [accessToken])

  return <div>{children}</div>
}

export default UseAxiosWrapper
