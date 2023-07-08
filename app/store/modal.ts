import { atom, atomFamily, selectorFamily, DefaultValue } from 'recoil'

import { MODAL_KEY } from '@/app/libs/client/constants/store'
import { MODAL_TYPES, R_MODAL_TYPES } from '@/app/libs/client/constants/code'

export type Modal = {
  id: string
  type: R_MODAL_TYPES
  show?: boolean
}

export type ModalProps = {
  modal: Modal
  callback?: () => void
}

const initialModal: ModalProps = {
  modal: {
    id: '',
    type: MODAL_TYPES.CONFIRM,
    show: false,
  },
  callback: () => alert('confirm type 일시 확인시 기본 알림창'),
}

export const modalIdsState = atom<string[]>({
  key: `${MODAL_KEY.아톰}/${new Date().getUTCMilliseconds() * Math.random()}`,
  default: [],
})

export const modalsState = atomFamily<ModalProps, string>({
  key: `${MODAL_KEY.패밀리}/${new Date().getUTCMilliseconds() * Math.random()}`,
  default: id => ({
    ...initialModal,
    modal: {
      ...initialModal.modal,
      id,
    },
    callback: () => alert('confirm type 일시 확인시 기본 알림창'),
  }),
})

export const modalSelector = selectorFamily<ModalProps, string>({
  key: `${MODAL_KEY.셀렉터}/${new Date().getUTCMilliseconds() * Math.random()}`,
  get:
    modalId =>
    ({ get }) =>
      get(modalsState(modalId)),
  set:
    modalId =>
    ({ get, set, reset }, modalInfo) => {
      if (modalInfo instanceof DefaultValue) {
        reset(modalsState(modalId))
        set(modalIdsState, prev => prev.filter(item => item !== modalId))
        return
      }

      set(modalsState(modalId), modalInfo)

      if (get(modalIdsState).find(id => id === modalInfo.modal.id)) return
      set(modalIdsState, prev => [...prev, modalInfo.modal.id])
    },
})
