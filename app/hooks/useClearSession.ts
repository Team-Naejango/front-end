import { useRouter } from 'next/navigation'

import { AUTH_TOKEN } from '@/app/libs/client/constants/store'
import { removeCookie } from '@/app/libs/client/utils/cookie'

export const useClearSession = () => {
  const router = useRouter()

  const ResetToken = () => {
    removeCookie(AUTH_TOKEN.접근)
    removeCookie(AUTH_TOKEN.갱신)

    router.push('/login')
  }

  return { ResetToken }
}
