import axios, { AxiosError, AxiosResponse, AxiosResponseHeaders, InternalAxiosRequestConfig } from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'

import { getCookie } from '@/app/libs/client/utils/cookie'
import { TokenValid } from '@/app/libs/client/utils/token'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store'
import { instance } from '@/app/apis/config/axios/instance'

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
  console.log('error.config:', error.config)

  if (error.response?.status === 403) {
    const isHasToken = await TokenValid()

    if (isHasToken) {
      const authorization = getCookie(AUTH_TOKEN.인가)

      // await kakaoLogin(authorization).then(response => {
      //   const { updateToken } = useUpdateToken()
      //
      //   if (response.success) {
      //     error.config!.headers = {
      //       'Content-Type': 'application/json',
      //       Authorization: `Bearer ${response.token.accessToken}`,
      //     } as HeaderType
      //
      //     updateToken(response.token.accessToken, response.token.refreshToken)
      //   }
      // })
      const requestConfig = await instance.request(error.config as AxiosRequestConfig)
      return requestConfig
    }
    return Promise.reject(error)
  }
}
