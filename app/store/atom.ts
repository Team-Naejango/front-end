import { atom } from 'recoil'

import { AUTH_TOKEN, STORE_KEY } from '@/app/libs/client/constants/store'
import { cookieEffect } from '@/app/store/effect/cookieEffect'

/**
 * 액세스 토큰
 * @todo 액세스 토큰 만료기한
 *
 * */
export const kakaoAccessToken = atom<string>({
  key: `${STORE_KEY.접근}/${new Date().getUTCMilliseconds() * Math.random()}`,
  default: undefined,
  // effects: [cookieEffect(AUTH_TOKEN.접근)],
})

/**
 * 유저정보
 *
 * */
export const userInfoState = atom({
  key: `${STORE_KEY.유저정보}/${new Date().getUTCMilliseconds() * Math.random()}`,
  default: {
    age: '',
    email: '',
    nickname: '',
    id: '',
    gender: '',
    accessToken: '',
  },
})

/**
 * 스플래쉬
 *
 * */
export const splashState = atom({
  key: `${STORE_KEY.스플래쉬}/${new Date().getUTCMilliseconds() * Math.random()}`,
  default: false,
})

/**
 * 유저 위치정보
 *
 * */
export const locationState = atom({
  key: `${STORE_KEY.위치정보}/${new Date().getUTCMilliseconds() * Math.random()}`,
  default: undefined,
})
