import { useSetRecoilState } from 'recoil'

import { kakaoAccessToken } from '@/app/store/atom'
import { setDeadlineCookie } from '@/app/libs/client/utils/cookie'
import { KAKAO_AUTH_TOKEN } from '@/app/libs/client/constants/store'

const UseUpdateToken = (accessToken: string, refreshToken: string) => {
  const setAccessToken = useSetRecoilState(kakaoAccessToken)

  setDeadlineCookie(KAKAO_AUTH_TOKEN.갱신, refreshToken)
  setAccessToken(accessToken)
}

export default UseUpdateToken
