import { useSetRecoilState } from 'recoil'

import { kakaoAccessToken } from '@/app/store/atom'
import { setDeadlineCookie } from '@/app/libs/client/utils/cookie'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store'

export const useUpdateToken = () => {
  const setAccessToken = useSetRecoilState(kakaoAccessToken)

  const updateToken = (accessToken: string, refreshToken: string) => {
    setDeadlineCookie(AUTH_TOKEN.갱신, refreshToken)
    setAccessToken(accessToken)
  }

  return { updateToken }
}
