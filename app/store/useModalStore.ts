import { atom } from 'recoil'

import { STORE_KEY } from '@/app/libs/client/constants/store'

/**
 * 모달
 *
 * */
export const useModalStore = atom({
  key: `${STORE_KEY.모달진입}/${new Date().getUTCMilliseconds() * Math.random()}`,
  default: false,
})
