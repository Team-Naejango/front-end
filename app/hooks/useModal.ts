import { useCallback } from 'react'
import { useRecoilCallback } from 'recoil'

import { Modal, ModalProps, modalSelector } from '@/app/store/modal'

type OmitShow = Omit<Modal, 'show'>
type OmitModalProps = Omit<ModalProps, 'OmitShow'>

export const useModal = () => {
  const setModal = useRecoilCallback(
    ({ set }) =>
      (value: ModalProps) => {
        set(modalSelector(value.modal.id), value)
      },
    []
  )

  const closeModal = useRecoilCallback(
    ({ reset }) =>
      (id: string) => {
        reset(modalSelector(id))
      },
    []
  )

  const openModal = useCallback(
    (params: OmitModalProps) => {
      const value = {
        modal: {
          ...params.modal,
          show: (params.modal.show = true),
        },
        callback: params.callback,
      }
      setModal(value)
    },
    [setModal]
  )

  return { closeModal, openModal }
}
