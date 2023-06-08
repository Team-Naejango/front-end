import axios, { AxiosError, AxiosResponse, AxiosResponseHeaders, InternalAxiosRequestConfig } from 'axios'
import type { AxiosRequestConfig } from 'axios'

import { refresh } from '@/app/apis/domain/auth/auth'
import { getCookie } from '@/app/libs/client/utils/cookie'
import { TokenValid } from '@/app/libs/client/utils/token'
import { KAKAO_AUTH_TOKEN } from '@/app/libs/client/constants/store'

interface HeaderType extends AxiosResponseHeaders {
  ['Content-Type']: string
  Authorization: string
}

// todo: auth와 notAuth로 axios 요청 분리
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN,
  withCredentials: true,
  timeout: 300000,
})

const requestConfig = (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
  const { headers } = config
  // todo: 액세스토큰 with recoil 전역관리
  const accessToken = document.cookie
  console.log('headers:', headers)
  console.log('accessToken:', accessToken)

  if (accessToken) {
    headers['Content-Type'] = 'application/json'
    headers.Authorization = `Bearer ${accessToken}`
  }

  return config
}

const requestErrorRejecter = (error: AxiosError | Error): Promise<AxiosError> => {
  return Promise.reject(error)
}

const responseApiErrorThrower = (response: AxiosResponse) => {
  if (!(response.status === 200 || response.status === 201 || response.status === 204)) {
    throw new Error()
  }
  return response
}

const responseNormalizer = async (error: AxiosError) => {
  console.log('error.config:', error.config)

  if (error.response?.status === 403) {
    const isHasToken = await TokenValid()

    if (isHasToken) {
      const accessToken = await refresh({ refreshToken: getCookie(KAKAO_AUTH_TOKEN.갱신) })

      if (accessToken) {
        error.config!.headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        } as HeaderType

        // todo: 새로 발급받은 토큰을 전역상태에 저장하기

        const normalizeResponse = await instance.request(error.config!.url as AxiosRequestConfig)
        return normalizeResponse
      }
    }
    return Promise.reject(error)
  }
}

instance.interceptors.request.use(requestConfig, requestErrorRejecter)
instance.interceptors.response.use(responseApiErrorThrower, responseNormalizer)

export { instance }
