import axios, { AxiosError, AxiosResponse, AxiosResponseHeaders, InternalAxiosRequestConfig } from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'

import { getCookie } from '@/app/libs/client/utils/cookie'
import { TokenValid } from '@/app/libs/client/utils/token'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store'

interface HeaderType extends AxiosResponseHeaders {
  ['Content-Type']: string
  Authorization: string
}

// todo: auth와 notAuth로 axios 요청 분리
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 300000,
})

const requestConfigurator = (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
  return config
}

const requestErrorRejecter = (error: AxiosError | Error): Promise<AxiosError> => {
  return Promise.reject(error)
}

const responseApiErrorThrower = (response: AxiosResponse) => {
  if (!(response.status === 200 || response.status === 201 || response.status === 204)) {
    throw new ApiError(response.status, response.data.error)
  }
  return response
}

const responseNormalizer = async (error: AxiosError) => {
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
      const retryConfig = await instance.request(error.config as AxiosRequestConfig)
      return retryConfig
    }
    return Promise.reject(error)
  }
}

instance.interceptors.request.use(requestConfigurator, requestErrorRejecter)
instance.interceptors.response.use(responseApiErrorThrower, responseNormalizer)

export { instance }
