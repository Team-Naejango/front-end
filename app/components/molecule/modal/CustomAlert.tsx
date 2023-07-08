import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useRecoilValue } from 'recoil'
import { BsCheck2 } from 'react-icons/bs'

import { useModal } from '@/app/hooks/useModal'
import { modalSelector } from '@/app/store/modal'
import { cls } from '@/app/libs/client/utils/util'
import { ImCheckmark } from 'react-icons/im'

interface AlertProps {
  id: string
  success?: boolean
  children?: React.ReactNode
}

const CustomAlert = ({ id, success, children }: AlertProps) => {
  const { closeModal } = useModal()
  const modalState = useRecoilValue(modalSelector(id))

  const onCloseAlert = (id: string) => {
    const currentAlertId = modalState.modal.id === id
    if (currentAlertId) closeModal(id)
  }

  return (
    <Transition appear show={modalState.modal.id === id} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={() => onCloseAlert(id)}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 left-1/2 top-1/2 h-[770px] w-[395px] -translate-x-1/2 -translate-y-1/2 rounded-[30px] bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 top-1/2 h-[780px] -translate-y-1/2 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center overflow-y-clip p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <Dialog.Panel className='w-[320px] max-w-md transform rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <div className={'flex flex-col items-center justify-center gap-2'}>
                  <ImCheckmark
                    className={cls(
                      'box-content h-7 w-7 rounded-full p-3',
                      success ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                    )}
                    aria-hidden='true'
                  />
                  <Dialog.Title as='h3' className='float-left ml-1 text-base font-medium leading-6 text-gray-900'>
                    {success ? '성공' : '실패'}
                  </Dialog.Title>
                </div>
                {children}
                <button
                  type='button'
                  className={cls(
                    'float-right mt-4 rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none',
                    success
                      ? 'bg-emerald-100 text-emerald-500 hover:bg-emerald-200'
                      : 'bg-red-100 text-red-500 hover:bg-red-200'
                  )}
                  onClick={() => onCloseAlert(id)}>
                  확인
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default CustomAlert
