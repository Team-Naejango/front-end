import { useResetRecoilState } from 'recoil'
import { useRouter } from 'next/navigation'

import { kakaoAccessToken } from '@/app/store/atom'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store'
import { removeCookie } from '@/app/libs/client/utils/cookie'

export const useClearSession = () => {
  const router = useRouter()

  const ResetToken = () => {
    useResetRecoilState(kakaoAccessToken)
    removeCookie(AUTH_TOKEN.갱신)

    router.push('/login')
  }

  return { ResetToken }
}
