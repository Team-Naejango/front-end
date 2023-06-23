import { atom } from 'recoil'

import { ReactElement } from 'react'
import { AUTH_TOKEN, STORE_KEY } from '@/app/libs/client/constants/store'
import { cookieEffect } from '@/app/store/effect/cookieEffect'

interface UserInfoProps {
  age: number | null
  email: string
  nickname: string
  id: string
  gender: string
  accessToken: string
}

interface LocationProps {
  latitude: number
  longitude: number
}

interface ModalProps {
  isOpen: boolean
  title: string
  content: ReactElement | string
  callback?: () => any
}

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
 * @property age / 나이
 * @property email / 이메일
 * @property nickname / 닉네임
 * @property id / 아이디
 * @property gender / 성별
 * @property accessToken / 액세스토큰
 * */
export const userInfoState = atom<UserInfoProps>({
  key: `${STORE_KEY.유저정보}/${new Date().getUTCMilliseconds() * Math.random()}`,
  default: {
    age: null,
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
export const splashState = atom<boolean>({
  key: `${STORE_KEY.스플래쉬}/${new Date().getUTCMilliseconds() * Math.random()}`,
  default: false,
})

/**
 * 유저 위치정보
 *
 * @property latitude / x좌표
 * @property longitude / y좌표
 * */
export const locationState = atom<LocationProps>({
  key: `${STORE_KEY.위치정보}/${new Date().getUTCMilliseconds() * Math.random()}`,
  default: {
    latitude: 0,
    longitude: 0,
  },
})

/**
 * 모달
 *
 * @property isOpen
 * @property callback
 * @property title / 제목
 * @property content / 내용
 * */
export const useModalStore = atom<ModalProps>({
  key: `${STORE_KEY.모달}/${new Date().getUTCMilliseconds() * Math.random()}`,
  default: {
    isOpen: false,
    title: '',
    content: '',
  },
})
