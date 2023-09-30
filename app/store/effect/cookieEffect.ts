import { AtomEffect, useSetRecoilState } from 'recoil'

import { refresh } from '@/app/apis/domain/auth/auth'
import { accessTokenStore } from '@/app/store/atom'

export const cookieEffect: <T>(key: string) => AtomEffect<T> =
  key =>
  ({ onSet }): any => {
    const setAccessToken = useSetRecoilState(accessTokenStore)

    onSet(async newRefreshToken => {
      if (newRefreshToken) {
        try {
          const response = await refresh()

          if (response.data?.result) {
            setAccessToken(response.data.result)
          }
        } catch (error) {
          console.error('재발급 오류:', error)
        }
      }
    })
  }
