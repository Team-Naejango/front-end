import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { BsCheck2 } from 'react-icons/bs'

interface DialogProps {
  show: boolean | undefined
  onClose: () => void
}

const CustomDialog = ({ show, onClose }: DialogProps) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={onClose}>
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

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <Dialog.Panel className='w-80 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <BsCheck2
                  className='mx-auto box-content h-6 w-6 rounded-full bg-[#DCFCE6] p-1.5 text-[#16A349]'
                  aria-hidden='true'
                />
                <Dialog.Title as='h3' className='mt-4 text-lg font-medium leading-6 text-gray-900'>
                  성공/실패 또는 상품 제목{/* {title} */}
                </Dialog.Title>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>
                    쓰이는 곳은 대충 CRUD 모든 곳, 지도에서 클릭 시 대충 상품 이미지와 내용들
                    <br />
                    @todo: 다이얼로그창과 모달창 디자인 및 데이터 전역 분리
                    {/* {children} */}
                  </p>
                </div>

                <div className='mt-4 flex justify-center gap-6 text-center'>
                  <button
                    type='button'
                    className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-500 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                    onClick={onClose}>
                    확인
                  </button>
                  <button
                    type='button'
                    className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-500 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                    onClick={onClose}>
                    취소
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default CustomDialog
