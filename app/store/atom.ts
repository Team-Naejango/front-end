import { atom } from 'recoil'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

import { KAKAO_AUTH_TOKEN, STORE_KEY } from '@/app/libs/client/constants/store'
import { cookieEffect } from '@/app/store/effect/cookieEffect'

/**
 * 액세스 토큰
 * @todo 액세스 토큰 만료기한
 * */
export const kakaoAccessToken = atom<RequestCookie | string | undefined>({
  key: STORE_KEY.접근,
  default: undefined,
  effects: [cookieEffect(KAKAO_AUTH_TOKEN.갱신)],
})

/**
 * 유저정보
 * */
export const userInfoState = atom({
  key: STORE_KEY.유저정보,
  default: {
    age: '',
    email: '',
    nickName: '',
    id: '',
    gender: '',
    accessToken: '',
  },
})
