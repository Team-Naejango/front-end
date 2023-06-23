import React from 'react'

import { useModal } from '@/app/hooks/useModal'
import Button from '@/app/components/atom/Button'

const CustomModal = ({ children }: { children: React.ReactNode }) => {
  const { modalState, closeModal } = useModal()

  return (
    <>
      {modalState.isOpen && (
        <>
          <div className={'h-[300px] w-[375px] bg-white'}>
            <h2>{modalState.title}</h2>
            <div>{children}</div>
            <Button onClick={closeModal} text={'X 버튼'} smail />
          </div>
        </>
      )}
    </>
  )
}

export default CustomModal
