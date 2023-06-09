import axios, { AxiosError, AxiosResponse, AxiosResponseHeaders, InternalAxiosRequestConfig } from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'
import { useRecoilValue } from 'recoil'

import { refresh } from '@/app/apis/domain/auth/auth'
import { getCookie } from '@/app/libs/client/utils/cookie'
import { TokenValid } from '@/app/libs/client/utils/token'
import { useUpdateToken } from '@/app/hooks/useUpdateToken'
import { KAKAO_AUTH_TOKEN } from '@/app/libs/client/constants/store'
import { kakaoAccessToken } from '@/app/store/atom'

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

const requestConfigurator = (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
  const { headers } = config
  console.log('headers:', headers)

  /**
   * @todo: 액세스토큰 가져오는 위치와 시점 고려하기
   * * 리코일은 클라이언트 사이드인데 이 페이지는 서버사이드다.
   * * 훅 관련해서도 검토해보기
   * */
  const useReadAccessToken = () => {
    return useRecoilValue(kakaoAccessToken)
  }

  if (headers) {
    headers['Content-Type'] = 'application/json'
    headers.Authorization = `Bearer ${useReadAccessToken}`
  }
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
      const {
        token: { accessToken, refreshToken },
        success: isTokenSuccess,
      } = await refresh({ refreshToken: getCookie(KAKAO_AUTH_TOKEN.갱신) })

      if (isTokenSuccess) {
        error.config!.headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        } as HeaderType

        // todo: 클라이언트 사이드와 서버사이드에서 사용해도 되는지 검토하기
        const MappingFnByUseUpdateToken = () => {
          const { updateToken } = useUpdateToken()
          updateToken(accessToken, refreshToken)

          return MappingFnByUseUpdateToken
        }

        // todo: request or response 구분 후 알맞은 파라미터 삽입
        const requestConfig = await instance.request(error.config as AxiosRequestConfig)
        return requestConfig
      }
    }
    return Promise.reject(error)
  }
}

instance.interceptors.request.use(requestConfigurator, requestErrorRejecter)
instance.interceptors.response.use(responseApiErrorThrower, responseNormalizer)

export { instance }
