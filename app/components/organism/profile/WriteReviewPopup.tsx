'use client'

import React from 'react'

import TextArea from '@/app/components/atom/TextArea'

const WriteReviewPopup = () => {
  return (
    <div>
      <div className='flex items-center space-x-4'>
        <div className='h-12 w-12 rounded-full bg-slate-500' />
        <div>
          <h4 className='text-sm font-bold text-gray-800'>내 잔고를 부탁해</h4>
          <div className='flex items-center'>
            {[...Array.from({ length: 5 }).keys()].map(value => {
              return (
                <svg
                  key={value}
                  className='h-5 w-5 text-gray-400'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'>
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                </svg>
                // <svg
                //   key={value}
                //   className='h-5 w-5 text-yellow-400'
                //   xmlns='http://www.w3.org/2000/svg'
                //   viewBox='0 0 20 20'
                //   fill='currentColor'
                //   aria-hidden='true'>
                //   <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                // </svg>
              )
            })}
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <TextArea placeholder={'리뷰 작성'} />
      </div>
    </div>
  )
}

export default WriteReviewPopup
