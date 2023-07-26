import { setDeadlineCookie } from '@/app/libs/client/utils/cookie'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store/common'

export const useUpdateToken = () => {
  const updateToken = (accessToken: string, refreshToken: string) => {
    setDeadlineCookie(AUTH_TOKEN.접근, accessToken)
    setDeadlineCookie(AUTH_TOKEN.갱신, refreshToken)
  }

  return { updateToken }
}
