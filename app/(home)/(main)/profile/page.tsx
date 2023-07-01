'use client'

import React from 'react'
import Link from 'next/link'

import Layout from '@/app/components/organism/layout/Layout'
import Button from '@/app/components/atom/Button'

const Profile = () => {
  return (
    <Layout hasHeader={false} seoTitle={'프로필'}>
      <div className='mt-8 px-4'>
        <div className='mt-5 flex flex-col items-center'>
          <div className='h-20 w-20 rounded-full bg-gray-300' />
          <span className='mt-3 text-base font-semibold'>내이름 잔고</span>
          <p className={'mt-1.5 text-sm font-normal text-gray-900'}>고양이에 관한 물품을 나누고 싶어요</p>
          <Link href={'/profile/edit'} className='mt-7 w-full'>
            <Button text='프로필 편집' />
          </Link>
        </div>
        <div className='mt-12 flex justify-around'>
          <Link href={'/profile/sold'} className='flex flex-col items-center'>
            <div className='flex h-14 w-14 items-center justify-center rounded-full bg-[#33CC99] text-white'>
              <svg
                className='h-6 w-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                />
              </svg>
            </div>
            <span className='mt-2 text-sm font-medium text-gray-700'>판매내역</span>
          </Link>
          <Link href={'/profile/bought'} className='flex flex-col items-center'>
            <div className='flex h-14 w-14 items-center justify-center rounded-full bg-[#33CC99] text-white'>
              <svg
                className='h-6 w-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                />
              </svg>
            </div>
            <span className='mt-2 text-sm font-medium text-gray-700'>구매내역</span>
          </Link>
          <Link href={'/profile/loved'} className='flex flex-col items-center'>
            <div className='flex h-14 w-14 items-center justify-center rounded-full bg-[#33CC99] text-white'>
              <svg
                className='h-6 w-6'
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
            <span className='mt-2 text-sm font-medium text-gray-700'>관심목록</span>
          </Link>
        </div>
        <div className='mt-12' />
      </div>
    </Layout>
  )
}

export default Profile
