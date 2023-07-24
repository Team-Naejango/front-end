import { AtomEffect } from 'recoil'

import { getCookie, setDeadlineCookie, removeAuthToken } from '@/app/libs/client/utils/cookie'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store'

export const cookieEffect: <T>(key: string) => AtomEffect<T> =
  key =>
  ({ onSet }): any => {
    onSet(async newAccessToken => {
      try {
        const refreshToken = getCookie(AUTH_TOKEN.갱신)

        if (refreshToken) {
          setDeadlineCookie(AUTH_TOKEN.접근, <string>newAccessToken)
        } else {
          removeAuthToken(AUTH_TOKEN.접근, AUTH_TOKEN.갱신)
        }
      } catch (error: unknown) {
        return Promise.reject(error)
      }
    })
  }
