import { AxiosError, AxiosResponse, AxiosResponseHeaders, InternalAxiosRequestConfig } from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'

// import { TokenValid } from '@/app/libs/client/utils/token'
// import { getCookie } from '@/app/libs/client/utils/cookie'
// import { AUTH_TOKEN } from '@/app/libs/client/constants/store/common'
// import { withAuth } from '@/app/apis/config/axios/withAuth'

// export interface HeaderType extends AxiosResponseHeaders {
//   ['Content-Type']: string
//   Authorization: string
// }
//
// const addAuthToken = (config: AxiosRequestConfig, token: string) => {
//   console.log('token:', token)
//   config.headers = {
//     'Content-Type': 'application/json',
//     Authorization: `${token}`,
//   } as HeaderType
// }

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
  return Promise.reject(error)
}

// if (error.response?.status === 403) {
// const isHasToken = TokenValid()
//
// if (!isHasToken) {
//   const refreshToken = getCookie(AUTH_TOKEN.갱신)
//   console.log('refreshToken:', refreshToken)
//
//   const newConfig = { ...error.config }
//   addAuthToken(newConfig, refreshToken)
//
//   try {
//     await withAuth.request(newConfig)
//   } catch (error: unknown) {
//     return false
//   }
// }
// }
