import { AxiosError, AxiosResponse, AxiosResponseHeaders, InternalAxiosRequestConfig } from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'

import { TokenValid } from '@/app/libs/client/utils/token'
import { setDeadlineCookie } from '@/app/libs/client/utils/cookie'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store/common'
import { withAuth } from '@/app/apis/config/axios/withAuth'

export interface HeaderType extends AxiosResponseHeaders {
  ['Content-Type']: string
  Authorization: string
}

type Refresh = {
  error?: string
  message?: string
  status?: number
  reissuedAccessToken?: string
  body: {
    error: string
    message: string
    status: number
    reissuedAccessToken: string
  }
  statusCodeValue?: number
}

const refreshAuthToken = (config: AxiosRequestConfig, token: Refresh | string) => {
  config.headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  } as HeaderType
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
  if (!error.config) {
    return false
  }
  console.log('error:', error)

  const data = error.response?.data as Refresh

  if (data.body && data.body.status === 401) {
    if (data.body.error === 'UNAUTHORIZED') {
      window.location.href = '/login'
      return false
    }

    const isHasToken = TokenValid()

    if (!isHasToken) {
      try {
        refreshAuthToken({ ...error.config }, data.body.reissuedAccessToken)
        setDeadlineCookie(AUTH_TOKEN.접근, data.body.reissuedAccessToken)

        return await withAuth.request(error.config)
      } catch (error: unknown) {
        return false
      }
    }
  }

  if (data.status === 404) {
    try {
      // window.location.href = '/login'
    } catch (error: unknown) {
      return false
    }
  }

  if (data.status === 409) {
    try {
      const data = error.response?.data as { reissuedAccessToken: string }

      refreshAuthToken({ ...error.config }, data.reissuedAccessToken)
      setDeadlineCookie(AUTH_TOKEN.접근, data.reissuedAccessToken)
      window.location.href = '/home'
    } catch (error: unknown) {
      return false
    }
  }

  return Promise.reject(error)
}
