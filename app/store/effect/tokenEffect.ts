import { AtomEffect, useSetRecoilState } from 'recoil'

import { accessTokenState } from '@/app/store/auth'

import { refresh } from '@/app/apis/domain/auth/auth'

export const tokenEffect: <T>(key: string) => AtomEffect<T> =
  key =>
  ({ onSet }): any => {
    const setAccessToken = useSetRecoilState<string | undefined>(accessTokenState)

    onSet(async accessToken => {
      if (!accessToken) {
        try {
          const response = await refresh()

          if (response.data) {
            return response.data.result
          }
        } catch (error) {
          console.error('재발급 오류:', error)
        }
      }
    })
  }
