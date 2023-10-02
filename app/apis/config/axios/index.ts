import { AxiosError, AxiosResponse, AxiosResponseHeaders, InternalAxiosRequestConfig } from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'
import { toast } from 'react-hot-toast'

import { TokenValid } from '@/app/libs/client/utils/token'
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

export const responseNormalizer = async (error: AxiosError) => {
  if (!error.config) return false

  const data = error.response?.data as Refresh

  // if ((data.status && data.status) === 400) {
  //   window.location.href = '/login'
  //   return false
  // }

  if (data.status === 401) {
    error.config.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.reissuedAccessToken}`,
    } as HeaderType

    return withAuth.request(error.config)

    // if (data.error === 'BAD_REQUEST') {
    //   window.location.href = '/login'
    //   return false
    // }
  }

  if ((data.body && data.body?.status) === 401) {
    const isHasToken = TokenValid()

    if (!isHasToken) {
      try {
        error.config.headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.body.reissuedAccessToken}`,
        } as HeaderType

        return await withAuth.request(error.config)
      } catch (error: unknown) {
        return false
      }
    }

    if (data.error === 'BAD_REQUEST') {
      window.location.href = '/login'
      return false
    }
  }

  if (data.status === 403) {
    if (data.error === 'FORBIDDEN') {
      window.location.href = '/sign'
      toast.error('회원가입을 진행해주세요.')
      return false
    }

    const isHasToken = TokenValid()

    if (!isHasToken) {
      try {
        error.config.headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.reissuedAccessToken}`,
        } as HeaderType

        return await withAuth.request(error.config)
      } catch (error: unknown) {
        return false
      }
    }
  }

  return Promise.reject(error)
}
