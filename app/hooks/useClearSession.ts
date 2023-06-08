import { useResetRecoilState } from 'recoil'

import { kakaoAccessToken } from '@/app/store/atom'
import { KAKAO_AUTH_TOKEN } from '@/app/libs/client/constants/store'
import { removeCookie } from '@/app/libs/client/utils/cookie'

export const useClearSession = () => {
  const resetAccessToken = useResetRecoilState(kakaoAccessToken)

  const resetRefreshToken = () => {
    removeCookie(KAKAO_AUTH_TOKEN.갱신)
  }

  return { resetAccessToken, resetRefreshToken }
}
