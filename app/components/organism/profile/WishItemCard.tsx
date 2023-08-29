'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface WishItemProps {
  title: string
  hearts: boolean
  img: string
  onClick: () => void
}

// todo: props 리팩토링 필요
const WishItemCard = ({ title, img, hearts, onClick }: WishItemProps) => {
  return (
    <Link href={`/profile/wish`} className='flex w-1/2 flex-row flex-wrap px-4 pt-5'>
      <div>
        <div className='relative h-36 w-36 rounded border border-[#ccc]'>
          <Image
            width={'100'}
            src={`https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/upload/item/${encodeURIComponent(img)}`}
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
        <div className='flex flex-col gap-2.5 pt-2'>
          <h3 className='text-xs font-normal text-gray-900'>{title}</h3>
        </div>
      </div>
    </Link>
  )
}

export default WishItemCard
