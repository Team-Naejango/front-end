import axios, { AxiosError, AxiosResponse, AxiosResponseHeaders, InternalAxiosRequestConfig } from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'

import { getCookie } from '@/app/libs/client/utils/cookie'
import { TokenValid } from '@/app/libs/client/utils/token'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store'
import { instance } from '@/app/apis/config/axios/instance'
import { kakaoLogin } from '@/app/apis/domain/auth/auth'
import { useUpdateToken } from '@/app/hooks/useUpdateToken'

interface HeaderType extends AxiosResponseHeaders {
  ['Content-Type']: string
  Authorization: string
}

export const requestConfigurator = (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
  return config
}

export const requestErrorRejecter = (error: AxiosError | Error): Promise<AxiosError> => {
  return Promise.reject(error)
}

export const responseApiErrorThrower = (response: AxiosResponse) => {
  if (!(response.status === 200 || response.status === 201 || response.status === 204)) {
    throw new ApiError(response.status, response.data.error)
  }
  return response
}

export const responseNormalizer = async (error: AxiosError) => {
  console.log('error.config:before', error.config)

  if (error.response?.status === 401) {
    const isHasToken = await TokenValid()

    if (isHasToken) {
      const accessToken = getCookie(AUTH_TOKEN.접근)

      error.config!.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      } as HeaderType

      console.log('error.config:after', error.config)

      const renewalConfig = await instance.request(error.config as AxiosRequestConfig)
      return renewalConfig
    }
    return Promise.reject(error)
  }
}
