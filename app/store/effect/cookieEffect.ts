import { AtomEffect } from 'recoil'

import { getCookie } from '@/app/libs/client/utils/cookie'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store'
import { kakaoLogin } from '@/app/apis/domain/auth/auth'
import { useClearSession } from '@/app/hooks/useClearSession'
import { useUpdateToken } from '@/app/hooks/useUpdateToken'

export const cookieEffect: <T>(key: string) => AtomEffect<T> =
  key =>
  ({ onSet }): any => {
    onSet(async () => {
      try {
        const refreshToken = getCookie(AUTH_TOKEN.갱신)

        if (!refreshToken) {
          const { ResetToken } = useClearSession()
          ResetToken()
          return
        }

        if (refreshToken) {
          const authorization = getCookie(AUTH_TOKEN.인가)
          const { updateToken } = useUpdateToken()

          await kakaoLogin(authorization).then(response => {
            if (response.success) {
              updateToken(response.data.accessToken, response.data.refreshToken)
            }
          })
        }
      } catch (error: unknown) {
        return Promise.reject(error)
      }
    })
  }
