import { atom } from 'recoil'

import { cookieEffect } from '@/app/store/effect/cookieEffect'
import { AUTH_TOKEN, COMMON_STORE_KEY } from '@/app/libs/client/constants/store/common'
import { PROFILE_STORE_KEY } from '@/app/libs/client/constants/store/profile'
import { PLACE_STORE_KEY } from '@/app/libs/client/constants/store/places'

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

/**
 * 액세스 토큰
 * @todo 액세스 토큰 만료기한
 *
 * */
export const kakaoAccessToken = atom<string>({
  key: `${COMMON_STORE_KEY.접근}/${new Date().getUTCMilliseconds() * Math.random()}`,
  default: undefined,
  effects: [cookieEffect(AUTH_TOKEN.접근)],
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
  key: `${PROFILE_STORE_KEY.유저정보}/${new Date().getUTCMilliseconds() * Math.random()}`,
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
  key: `${COMMON_STORE_KEY.스플래쉬}/${new Date().getUTCMilliseconds() * Math.random()}`,
  default: false,
})

/**
 * 유저 위치정보
 *
 * @property latitude / x좌표
 * @property longitude / y좌표
 * */
export const locationState = atom<LocationProps>({
  key: `${COMMON_STORE_KEY.위치정보}/${new Date().getUTCMilliseconds() * Math.random()}`,
  default: {
    latitude: 37.5704,
    longitude: 126.9922,
  },
})
// center={{ lat: 33.450701, lng: 126.570667 }}
/**
 * 지도 유저창고 아이템 리스트
 *
 * @property name / 아이템명
 * */
export const markerItemsState = atom<{ name: string }[]>({
  key: `${PLACE_STORE_KEY.마커아이템}/${new Date().getUTCMilliseconds() * Math.random()}`,
  default: [
    {
      name: '',
    },
  ],
})

/**
 * 최근 활성화된 창고 타이틀
 *
 * */
export const activatedWareHouseTitleState = atom<string>({
  key: `${PLACE_STORE_KEY.창고이름조회}/${new Date().getUTCMilliseconds() * Math.random()}`,
  default: '',
})

// /**
//  * 토큰 검증
//  *
//  * */
// export const tokenValidatedState = atom<boolean>({
//   key: `${COMMON_STORE_KEY.토큰검증}/${new Date().getUTCMilliseconds() * Math.random()}`,
//   default: false,
// })
