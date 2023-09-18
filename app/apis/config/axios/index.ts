import { AxiosError, AxiosResponse, AxiosResponseHeaders, InternalAxiosRequestConfig } from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'

import { TokenValid } from '@/app/libs/client/utils/token'
import { getCookie, setDeadlineCookie } from '@/app/libs/client/utils/cookie'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store/common'
import { withAuth } from '@/app/apis/config/axios/instance/withAuth'

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

const refreshAuthToken = (config: AxiosRequestConfig, token: Refresh | string) => {
  config.headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  } as HeaderType
}

export const responseNormalizer = async (error: AxiosError) => {
  if (!error.config) {
    return false
  }

  const data = error.response?.data as Refresh

  if (data.body && data.body.status === 401) {
    // if (data.body.error === 'UNAUTHORIZED') {
    //   window.location.href = '/login'
    //   return false
    // }

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

  if (data && data.status === 401) {
    if (data.error === 'UNAUTHORIZED') {
      window.location.href = '/login'
      return false
    }

    const isHasToken = TokenValid()

    if (!isHasToken) {
      try {
        refreshAuthToken({ ...error.config }, data.reissuedAccessToken!)
        setDeadlineCookie(AUTH_TOKEN.접근, data.reissuedAccessToken!)

        return await withAuth.request(error.config)
      } catch (error: unknown) {
        return false
      }
    }
  }

  if (data && data.status === 403) {
    if (data.error === 'FORBIDDEN') {
      window.location.href = '/sign'
      return false
    }

    const isHasToken = TokenValid()

    if (!isHasToken) {
      try {
        refreshAuthToken({ ...error.config }, data.reissuedAccessToken!)
        setDeadlineCookie(AUTH_TOKEN.접근, data.reissuedAccessToken!)

        return await withAuth.request(error.config)
      } catch (error: unknown) {
        return false
      }
    }
  }

  return Promise.reject(error)
}
