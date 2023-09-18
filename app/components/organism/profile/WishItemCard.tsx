'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { WishResult } from '@/app/apis/types/domain/profile/wish'
import { cls } from '@/app/libs/client/utils/util'

interface WishItemProps {
  wish: WishResult
  hearts: boolean
  onClick: () => void
}

const WishItemCard = ({ wish, hearts, onClick }: WishItemProps) => {
  return (
    <Link href={`/profile/wish`} prefetch={false} className='flex w-1/2 flex-row flex-wrap px-4 pt-5'>
      <div>
        <div className='relative h-36 w-36 rounded border border-[#ddd]'>
          <Image
            width={'100'}
            src={`https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/upload/item/${encodeURIComponent(
              wish?.imgUrl
            )}`}
            height={'100'}
            alt='아이템 이미지'
            className={'h-36 w-36 object-cover'}
          />
          <div role={'presentation'} className={'absolute right-1.5 top-1.5 text-[#33CC99]'} onClick={onClick}>
            <svg
              className='h-5 w-5'
              fill={hearts ? '#33CC99' : 'none'}
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
              />
            </svg>
          </div>
        </div>
        <div className='flex w-5/6 items-center gap-1.5 pt-2'>
          <span
            className={cls(
              'rounded px-0.5 py-0.5 text-[10px] text-white',
              wish?.itemType === 'BUY' ? 'bg-[#30BD81] !px-1' : 'bg-[#A3D139]'
            )}>
            {wish?.itemType}
          </span>
          <h3 className='overflow-hidden overflow-ellipsis whitespace-nowrap text-xs font-normal text-gray-900'>
            {wish.name}
          </h3>
        </div>
      </div>
    </Link>
  )
}

export default WishItemCard
