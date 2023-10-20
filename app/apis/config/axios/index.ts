import { AxiosError, AxiosResponse, AxiosResponseHeaders, InternalAxiosRequestConfig } from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'
import { toast } from 'react-hot-toast'
import { ApiErrorData } from '@/app/apis/types/response/response'

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
  if (!error.config) return false

  const data = error.response?.data as ApiErrorData

  if (data.status === 403) {
    if (data.error === 'FORBIDDEN') {
      window.location.href = '/sign'
      toast.error('회원가입을 진행해 주세요.')
      return false
    }
  }

  return Promise.reject(error)
}
