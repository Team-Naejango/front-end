import { AxiosError, AxiosResponse, AxiosResponseHeaders, InternalAxiosRequestConfig } from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'
import { getCookie } from 'cookies-next'

import { TokenValid } from '@/app/libs/client/utils/token'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store/common'
import { instance } from '@/app/apis/config/axios/instance'

export interface HeaderType extends AxiosResponseHeaders {
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
  if (error.response?.status === 403) {
    const isHasToken = TokenValid()

    if (!isHasToken) {
      const refreshToken = getCookie(AUTH_TOKEN.갱신)

      error.config!.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      } as HeaderType

      try {
        await instance.request(error.config as AxiosRequestConfig)
      } catch (error: unknown) {
        return false
      }
    }
    return Promise.reject(error)
  }
}
