import { AUTH_TOKEN } from '@/app/libs/client/constants/store'
import { removeAllCookie } from '@/app/libs/client/utils/cookie'

export const useClearSession = () => {
  const ResetToken = () => {
    removeAllCookie(AUTH_TOKEN.접근, AUTH_TOKEN.갱신)
  }

  return { ResetToken }
}
