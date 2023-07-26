import { atom, atomFamily, selectorFamily, DefaultValue } from 'recoil'

import { MODAL_STORE_KEY } from '@/app/libs/client/constants/store/common'
import { MODAL_TYPES, E_MODAL_TYPES } from '@/app/libs/client/constants/code'

export type Modal = {
  id: string
  type: E_MODAL_TYPES
  title?: string
  content?: string
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
    title: '',
    content: '',
    show: false,
  },
  callback: () => {},
}

export const modalIdsState = atom<string[]>({
  key: `${MODAL_STORE_KEY.아톰}/${new Date().getUTCMilliseconds() * Math.random()}`,
  default: [],
})

export const modalsState = atomFamily<ModalProps, string>({
  key: `${MODAL_STORE_KEY.패밀리}/${new Date().getUTCMilliseconds() * Math.random()}`,
  default: id => ({
    ...initialModal,
    modal: {
      ...initialModal.modal,
      id,
    },
  }),
})

export const modalSelector = selectorFamily<ModalProps, string>({
  key: `${MODAL_STORE_KEY.셀렉터}/${new Date().getUTCMilliseconds() * Math.random()}`,
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
