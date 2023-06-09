import { useRecoilValue } from 'recoil'

import { refresh } from '@/app/apis/domain/auth/auth'
import { getCookie } from '@/app/libs/client/utils/cookie'
import { KAKAO_AUTH_TOKEN } from '@/app/libs/client/constants/store'
import { kakaoAccessToken } from '@/app/store/atom'
import { useClearSession } from '@/app/hooks/useClearSession'

/**
 * 토큰 검증
 *
 * */
export const TokenValid = async () => {
  const accessToken = useRecoilValue(kakaoAccessToken)
  const refreshToken = getCookie(KAKAO_AUTH_TOKEN.갱신)
  const { ResetToken } = useClearSession()

  if (!accessToken) {
    return false
  }

  if (!refreshToken) {
    try {
      const response = await refresh({ refreshToken: getCookie(KAKAO_AUTH_TOKEN.갱신) })

      if (!response.success) {
        console.log('리프레시 토큰이 만료됨')
        ResetToken()

        return false
      }
    } catch (error: unknown) {
      return Promise.reject(error)
    }
  }

  return true
}
