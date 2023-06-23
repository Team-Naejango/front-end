import { ReactElement, useCallback } from 'react'
import { useRecoilState } from 'recoil'

import { useModalStore } from '@/app/store/atom'

export interface OpenModalProps {
  title: string
  content: ReactElement | string
  callback?: () => any
}

export const useModal = () => {
  const [modalState, setModalState] = useRecoilState(useModalStore)

  const closeModal = useCallback(() => {
    setModalState(prev => {
      return { ...prev, isOpen: false }
    })
  }, [setModalState])

  const openModal = useCallback(
    ({ title, content, callback }: OpenModalProps) => {
      setModalState({
        isOpen: true,
        title,
        content,
        callback,
      })
    },
    [setModalState]
  )

  return { modalState, closeModal, openModal }
}
