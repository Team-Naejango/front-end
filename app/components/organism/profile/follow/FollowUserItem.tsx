'use client'

import React, { useRef } from 'react'
import Image from 'next/image'

import { Item } from '@/app/apis/types/domain/warehouse/warehouse'

const FollowUserItem = ({ items }: { items: Item[] }) => {
  const currentItemRef = useRef<HTMLDivElement | null>(null)

  return (
    <div className='grid grid-cols-2 grid-rows-[minmax(0,1fr)] justify-items-center gap-4 py-4'>
      {items ? (
        items.map(item => {
          return (
            <div key={item.itemId} role={'presentation'} ref={currentItemRef} className={'relative'}>
              <Image
                width={'100'}
                src={`https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/upload/item/${encodeURIComponent(
                  item.imgUrl
                )}`}
                height={'100'}
                alt='아이템 이미지'
                className={'h-28 w-28 cursor-pointer rounded-md border border-[#ddd] object-cover'}
              />

              {/* hover */}
              <div className='absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-md bg-black bg-opacity-50 opacity-0 transition-opacity hover:opacity-100'>
                <div className={'flex h-full items-center justify-center'}>
                  <span className={'text-sm text-white'}>{item.name}</span>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <div className={'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'}>
          <p className={'text-[15px]'}>팔로우 목록이 없습니다.</p>
        </div>
      )}
    </div>
  )
}

export default FollowUserItem
