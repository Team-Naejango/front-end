import { AUTH_TOKEN } from '@/app/libs/client/constants/store/common'
import { removeAuthToken } from '@/app/libs/client/utils/cookie'

export const useClearSession = () => {
  const ResetToken = () => {
    removeAuthToken(AUTH_TOKEN.접근, AUTH_TOKEN.갱신)
  }

  return { ResetToken }
}
