import { getCookie } from '@/app/libs/client/utils/cookie'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store'
import { useClearSession } from '@/app/hooks/useClearSession'

/**
 * 토큰 검증
 *
 * */
export const TokenValid = async () => {
  const refreshToken = getCookie(AUTH_TOKEN.갱신)
  const accessToken = getCookie(AUTH_TOKEN.접근)
  // const accessToken = useRecoilValue(kakaoAccessToken)
  const { ResetToken } = useClearSession()

  if (!accessToken) {
    return false
  }

  if (!refreshToken) {
    try {
      console.log('리프레시 토큰이 만료됨')
      ResetToken()
      return false
    } catch (error: unknown) {
      return Promise.reject(error)
    }
  }

  return true
}
