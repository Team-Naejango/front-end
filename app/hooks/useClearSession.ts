import { AUTH_TOKEN } from '@/app/libs/client/constants/store/common'
import { removeAuthToken, setDeadlineCookie } from '@/app/libs/client/utils/cookie'

export const useClearSession = () => {
  const updateToken = (accessToken: string, refreshToken: string) => {
    setDeadlineCookie(AUTH_TOKEN.접근, accessToken)
    setDeadlineCookie(AUTH_TOKEN.갱신, refreshToken)
  }

  const resetToken = () => {
    removeAuthToken(AUTH_TOKEN.접근, AUTH_TOKEN.갱신)
    localStorage.clear()
  }

  return { updateToken, resetToken }
}
