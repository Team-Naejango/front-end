import React, { Fragment, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { Dialog, Transition } from '@headlessui/react'

import { useModal } from '@/app/hooks/useModal'
import Button from '@/app/components/atom/Button'
import { modalSelector } from '@/app/store/modal'
import { E_MODAL_TYPES, MODAL_TYPES } from '@/app/libs/client/constants/code'

interface ModalProps {
  id: string
  type?: E_MODAL_TYPES
  btn?: boolean
  btnTxt?: string
  children?: React.ReactNode
}

const CustomModal = ({ id, type = MODAL_TYPES.CONFIRM, btn = false, btnTxt = '확인', children }: ModalProps) => {
  const cancelButtonRef = useRef<HTMLDivElement | null>(null)
  const { closeModal } = useModal()
  const modalState = useRecoilValue(modalSelector(id))
  const { modal, callback } = modalState

  const onCloseModal = (id: string) => {
    const hasModalId = modalState.modal.id === id
    if (hasModalId) return closeModal(id)
  }

  const modalCallback = () => {
    if (callback) {
      callback()
      onCloseModal(id)
    } else {
      onCloseModal(id)
    }
  }

  return (
    <Transition appear show={modalState.modal.id === id} as={Fragment}>
      <Dialog initialFocus={cancelButtonRef} as='div' className='relative z-10' onClose={() => onCloseModal(id)}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <Dialog.Overlay className='fixed inset-0 left-1/2 top-1/2 h-[770px] w-[395px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[30px] bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 top-1/2 h-[780px] -translate-y-1/2'>
          <div
            className={`flex min-h-full justify-center overflow-y-clip p-4 text-center ${
              type === MODAL_TYPES.CONFIRM ? 'items-end' : 'items-center'
            }`}>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300 transform'
              enterFrom={`opacity-0 scale-100 ${
                type === MODAL_TYPES.CONFIRM ? 'translate-y-[200px]' : 'translate-y-[20px]'
              }`}
              enterTo='opacity-100 scale-100 translate-y-[0px]'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <Dialog.Panel
                ref={cancelButtonRef}
                className={`${
                  type === MODAL_TYPES.CONFIRM ? 'w-[375px] p-6' : 'w-[330px] px-5 pb-2 pt-6 text-center'
                } max-w-md transform rounded-2xl bg-white text-left align-middle shadow-xl transition-all`}>
                {type === MODAL_TYPES.CONFIRM ? (
                  <>
                    {children}
                    {btn ? (
                      <div className={'mt-4 text-center'}>
                        <Button
                          small
                          text={btnTxt}
                          className={'!py-2'}
                          onClick={() => (callback ? modalCallback() : {})}
                        />
                        <Button
                          small
                          cancel
                          ref={cancelButtonRef}
                          text={'취소'}
                          className={'ml-2 !py-2'}
                          onClick={() => onCloseModal(id)}
                        />
                      </div>
                    ) : null}
                  </>
                ) : (
                  <>
                    {modal.title && (
                      <Dialog.Title as='h2' className='text-lg font-semibold'>
                        {modal.title}
                      </Dialog.Title>
                    )}
                    {modal.content && (
                      <div className='p-3'>
                        <div className='overflow-auto p-3 text-sm'>{modal.content}</div>
                      </div>
                    )}
                    <Dialog.Description as={Fragment}>
                      <div
                        className={`p-4 ${
                          modal.type === MODAL_TYPES.ALERT ? '' : 'mx-auto flex w-[200px] justify-around gap-4'
                        }`}>
                        {modal.type === MODAL_TYPES.ALERT ? (
                          <>
                            {children}
                            <div className={'mt-4 text-center'}>
                              <Button
                                small
                                text={'확인'}
                                className={'!flex-grow-0 !py-2'}
                                onClick={() => modalCallback()}
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <Button
                              small
                              text={'확인'}
                              className={'!py-2'}
                              onClick={() => (callback ? modalCallback() : {})}
                            />
                            <Button
                              small
                              cancel
                              ref={cancelButtonRef}
                              text={'취소'}
                              className={'!py-2'}
                              onClick={() => onCloseModal(id)}
                            />
                          </>
                        )}
                      </div>
                    </Dialog.Description>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default CustomModal
