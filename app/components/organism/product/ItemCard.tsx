'use client'

import React from 'react'
import Link from 'next/link'

interface ItemProps {
  title: string
  id: number
  price: string
}

const ItemCard = ({ title, price, id }: ItemProps) => {
  return (
    <Link href={`/products/${id}`} className='flex w-1/2 flex-row flex-wrap justify-center px-4 pt-5'>
      <div>
        <div className='relative h-36 w-36 rounded-md bg-gray-200 opacity-70'>
          <div className={'absolute right-1.5 top-1.5 text-[#33CC99]'}>
            <svg
              className='h-5 w-5'
              fill='none'
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
          <div className={'flex items-center justify-between'}>
            <div className={'flex'}>
              <div className='relative -mr-2 h-5 w-5 rounded-full bg-gray-400' />
              <div className='relative -mr-2 h-5 w-5 rounded-full bg-gray-500' />
              <div className='relative -mr-2 h-5 w-5 rounded-full bg-gray-600' />
            </div>
            <span className='rounded bg-[#33CC99] p-[7px] text-xs font-normal text-white'>{price}원</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ItemCard
