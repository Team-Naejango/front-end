import { atom } from 'recoil'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

import { KAKAO_AUTH_TOKEN, KAKAO_KEY } from '@/app/libs/client/constants/store'
import { getCookie } from '@/app/libs/client/utils/cookie'
import { cookieEffect } from '@/app/store/effect/cookieEffect'

/**
 * 액세스 토큰
 *
 * */
export const kakaoAccessToken = atom<RequestCookie | undefined>({
  key: KAKAO_KEY.접근,
  default: getCookie(KAKAO_AUTH_TOKEN.접근),
  effects: [cookieEffect(KAKAO_AUTH_TOKEN.갱신)],
})

/**
 * 유저정보
 *
 * */
export const userInfoState = atom({
  key: KAKAO_KEY.유저정보,
  default: {
    age: '',
    email: '',
    nickName: '',
    id: '',
    gender: '',
    accessToken: '',
  },
})

// todo: 액세스 토큰 만료기한
// 참고
// const userAtom = atom({
//   key: `user/${new Date().getUTCMilliseconds() * Math.random()}`,
//   effects: [cookieEffect(ACCESS_TOKEN, REFRESH_TOKEN)],
//   default: SIGNOUT_USER_STATE,
// })
