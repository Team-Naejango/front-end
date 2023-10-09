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
  const isHasToken = TokenValid()

  if (data.status === 400 && data.message === '토큰 발급에 실패했습니다.') {
    window.location.href = '/login'
    toast.error('로그인이 만료되었습니다. 다시 로그인해 주세요.')
    return false
  }

  if (data.status === 401) {
    if (!isHasToken) {
      try {
        error.config.headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.reissuedAccessToken}`,
        } as HeaderType

        // if (typeof window !== 'undefined') {
        //   localStorage.setItem('accessToken', <string>data.reissuedAccessToken)
        // }

        return await withAuth.request(error.config)
      } catch (error: unknown) {
        return false
      }
    }
  }

  if ((data.body && data.body?.status) === 401) {
    if (!isHasToken) {
      try {
        error.config.headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.body.reissuedAccessToken}`,
        } as HeaderType

        // if (typeof window !== 'undefined') {
        //   localStorage.setItem('accessToken', data.body.reissuedAccessToken)
        // }

        return await withAuth.request(error.config)
      } catch (error: unknown) {
        return false
      }
    }
  }

  if (data.status === 403) {
    if (data.error === 'FORBIDDEN') {
      window.location.href = '/sign'
      toast.error('회원가입을 진행해 주세요.')
      return false
    }

    if (!isHasToken) {
      try {
        error.config.headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.reissuedAccessToken}`,
        } as HeaderType

        // if (typeof window !== 'undefined') {
        //   localStorage.setItem('accessToken', <string>data.reissuedAccessToken)
        // }

        return await withAuth.request(error.config)
      } catch (error: unknown) {
        return false
      }
    }
  }

  return Promise.reject(error)
}
