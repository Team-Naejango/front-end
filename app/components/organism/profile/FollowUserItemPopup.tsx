'use client'

import React, { useRef, useState } from 'react'

const FollowUserItemPopup = () => {
  const ref = useRef<HTMLDivElement | null>(null)

  return (
    <div className='grid grid-cols-2 grid-rows-[minmax(0,1fr)] justify-items-center gap-4 py-4'>
      {[1, 2, 3, 4, 5].map((_, i) => {
        return (
          <div key={_} role={'presentation'} ref={ref} className='h-28 w-28 cursor-pointer rounded-md bg-gray-200'>
            {/* hover */}
            <div className='h-28 w-28 rounded-md bg-black bg-opacity-50 opacity-0 transition-opacity hover:opacity-100'>
              <div className={'flex h-full items-center justify-center'}>
                <span className={'text-sm text-white'}>아이템명</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default FollowUserItemPopup
