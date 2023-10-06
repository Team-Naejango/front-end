import { atom } from 'recoil'

import { cookieEffect } from '@/app/store/effect/cookieEffect'
import { AUTH_TOKEN, COMMON_STORE_KEY } from '@/app/libs/client/constants/store/common'
import { PLACE_STORE_KEY } from '@/app/libs/client/constants/store/places'
import { TRANSACTION_STORE_KEY } from '@/app/libs/client/constants/store/transaction'

interface LocationProps {
  latitude: number
  longitude: number
}

/**
 * 액세스 토큰
 *
 * */
export const accessTokenStore = atom<string>({
  key: `${COMMON_STORE_KEY.접근}/${new Date().getUTCMilliseconds() * Math.random()}`,
  default: undefined,
  // effects: [cookieEffect(AUTH_TOKEN.갱신)],
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
 * @property latitude // x좌표
 * @property longitude // y좌표
 * */
export const locationState = atom<LocationProps>({
  key: `${COMMON_STORE_KEY.위치정보}/${new Date().getUTCMilliseconds() * Math.random()}`,
  default: {
    latitude: 37.5704,
    longitude: 126.9922,
  },
})

/**
 * 지도 유저창고 아이템 리스트
 *
 * @property name // 아이템명
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

/**
 * 거래 시스템 메세지
 *
 * */
export const systemMessageState = atom<string | undefined>({
  key: `${TRANSACTION_STORE_KEY.시스템메세지}/${new Date().getUTCMilliseconds() * Math.random()}`,
  default: undefined,
})
