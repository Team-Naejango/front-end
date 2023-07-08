import React, { Fragment } from 'react'
import { useRecoilValue } from 'recoil'
import { Dialog, Transition } from '@headlessui/react'

import { useModal } from '@/app/hooks/useModal'
import { modalSelector } from '@/app/store/modal'

interface ModalProps {
  id: string
  children: React.ReactNode
}

const CustomModal = ({ id, children }: ModalProps) => {
  const { closeModal } = useModal()
  const modalState = useRecoilValue(modalSelector(id))

  const onCloseModal = (id: string) => {
    const currentModalId = modalState.modal.id === id
    if (currentModalId) closeModal(id)
  }

  return (
    <>
      {modalState.modal.show && (
        <Transition appear show={modalState.modal.id === id} as={Fragment}>
          <Dialog as='div' className='relative z-10' onClose={() => onCloseModal(id)}>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <div className='fixed inset-0 left-1/2 top-1/2 h-[770px] w-[395px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[30px] bg-black bg-opacity-25' />
            </Transition.Child>

            <div className='fixed inset-0 top-1/2 h-[780px] -translate-y-1/2'>
              <div className='flex min-h-full items-end justify-center overflow-y-clip p-4 text-center'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-300 transform'
                  enterFrom='opacity-0 scale-100 translate-y-[200px]'
                  enterTo='opacity-100 scale-100 translate-y-[0px]'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 scale-100'
                  leaveTo='opacity-0 scale-100'>
                  <Dialog.Panel className='w-[375px] max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                    {children}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  )
}

export default CustomModal
