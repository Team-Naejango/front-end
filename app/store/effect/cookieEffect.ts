import { AxiosRequestConfig } from 'axios'
import { AtomEffect } from 'recoil'

import { instance } from '@/app/apis/config/axios'
import { getCookie } from '@/app/libs/client/utils/cookie'
import { KAKAO_AUTH_TOKEN } from '@/app/libs/client/constants/store'
import UseClearSession from '@/app/hooks/useClearSession'
import { refresh } from '@/app/apis/domain/auth/auth'

export const cookieEffect: <T>(key: string) => AtomEffect<T> =
  key =>
  ({ onSet }): any => {
    onSet(async () => {
      try {
        const refreshToken = getCookie(KAKAO_AUTH_TOKEN.갱신)

        if (!refreshToken) {
          UseClearSession()
          return
        }

        const { token, success } = await refresh({ refreshToken })

        if (success) {
          // todo: 알맞은 파라미터 삽입
          return await instance.request(token as AxiosRequestConfig)
        }
      } catch (error: unknown) {
        return Promise.reject(error)
      }
    })
  }
