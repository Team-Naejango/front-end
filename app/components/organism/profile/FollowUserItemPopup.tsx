'use client'

import React, { useRef } from 'react'

import { Item } from '@/app/apis/types/domain/warehouse/warehouse'
import Image from 'next/image'

const FollowUserItemPopup = ({ items }: { items: Item[] }) => {
  const ref = useRef<HTMLDivElement | null>(null)

  return (
    <div className='grid grid-cols-2 grid-rows-[minmax(0,1fr)] justify-items-center gap-4 py-4'>
      {items.map(item => {
        return (
          <div key={item.itemId} role={'presentation'} ref={ref} className={'relative'}>
            <Image
              width={'100'}
              src={`https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/upload/item/${encodeURIComponent(
                item.imgUrl
              )}`}
              height={'100'}
              alt='아이템 이미지'
              className={'h-28 w-28 cursor-pointer rounded-md border border-[#ccc] object-cover'}
            />
            {/* hover */}
            <div className='absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-md bg-black bg-opacity-50 opacity-0 transition-opacity hover:opacity-100'>
              <div className={'flex h-full items-center justify-center'}>
                <span className={'text-sm text-white'}>{item.name}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default FollowUserItemPopup
