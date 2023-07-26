import jwtDecode from 'jwt-decode'
// import { useRecoilState } from 'recoil'

import { getCookie } from '@/app/libs/client/utils/cookie'
import { useClearSession } from '@/app/hooks/useClearSession'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store/common'

/**
 * 토큰 검증
 *
 * */
export const TokenValid = () => {
  const refreshToken = getCookie(AUTH_TOKEN.갱신)
  const accessToken = getCookie(AUTH_TOKEN.접근)
  // const accessToken = useRecoilValue(kakaoAccessToken)
  const { ResetToken } = useClearSession()

  const decodedToken = jwtDecode(accessToken) as { exp: number }
  const expirationTime = decodedToken.exp * 1000

  if (Date.now() > expirationTime) {
    console.log('액세스 토큰 만료')
    return false
  }

  if (!refreshToken) {
    console.log('리프레시 토큰 만료')
    ResetToken()
    return false
  }
  return true
}
