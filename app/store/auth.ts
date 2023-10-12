import { atom, selector } from 'recoil'

import { AUTH_TOKEN } from '@/app/libs/client/constants/store/common'

/**
 * 액세스 토큰
 *
 * */
export const accessTokenState = atom<string | undefined>({
  key: `${AUTH_TOKEN.접근}/${new Date().getUTCMilliseconds() * Math.random()}`,
  default: undefined,
  // effects: [tokenEffect(AUTH_TOKEN.갱신)],
})

export const accessTokenSelector = selector<string | undefined>({
  key: `${AUTH_TOKEN.갱신}/${new Date().getUTCMilliseconds() * Math.random()}`,
  get: ({ get }) => {
    const currentAccessToken = get(accessTokenState)

    if (currentAccessToken) {
      return currentAccessToken
    }
  },

  set: async ({ set }, newAccessToken) => {
    set(accessTokenState, newAccessToken)
  },
})
