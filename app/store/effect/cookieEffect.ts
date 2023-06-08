import { AxiosRequestConfig } from 'axios'
import { AtomEffect } from 'recoil'

import { instance } from '@/app/apis/config/axios'
import { getCookie } from '@/app/libs/client/utils/cookie'
import { KAKAO_AUTH_TOKEN } from '@/app/libs/client/constants/store'
import { useClearSession } from '@/app/hooks/useClearSession'
import { refresh } from '@/app/apis/domain/auth/auth'

export const cookieEffect: <T>(key: string) => AtomEffect<T> =
  key =>
  ({ onSet }): any => {
    onSet(async () => {
      try {
        const refreshToken = getCookie(KAKAO_AUTH_TOKEN.갱신)

        if (!refreshToken) {
          const { resetRefreshToken, resetAccessToken } = useClearSession()
          resetAccessToken()
          resetRefreshToken()
          return false
        }

        const { token, success } = await refresh({ refreshToken })

        if (success) {
          return await instance.request(token as AxiosRequestConfig)
        }
      } catch (error: unknown) {
        return Promise.reject(error)
      }
    })
  }
