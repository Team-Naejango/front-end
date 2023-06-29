'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cls } from '@/app/libs/client/utils/util'

const Lnb = () => {
  const pathname = usePathname()

  return (
    <nav className='absolute bottom-0 left-0 z-[1000] flex w-[375px] max-w-xl items-center justify-between rounded-[24px] bg-white px-7 pb-3 pt-3 text-xs shadow-[0px_0px_3px_rgb(215,215,215)]'>
      <Link
        href={'/home'}
        className={cls(
          'flex flex-col items-center space-y-1.5',
          pathname.match('/home') ? 'text-[#33CC99]' : 'transition-colors hover:text-gray-500'
        )}>
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'>
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
            d='m9.02 2.84-5.39 4.2C2.73 7.74 2 9.23 2 10.36v7.41c0 2.32 1.89 4.22 4.21 4.22h11.58c2.32 0 4.21-1.9 4.21-4.21V10.5c0-1.21-.81-2.76-1.8-3.45l-6.18-4.33c-1.4-.98-3.65-.93-5 .12Z'
          />
          <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M12 17.99v-3' />
        </svg>
        <span>홈</span>
      </Link>
      <Link
        href={'/places'}
        className={cls(
          'flex flex-col items-center space-y-1.5',
          pathname.match('/places') ? 'text-[#33CC99]' : 'transition-colors hover:text-gray-500'
        )}>
        <svg
          version='1.0'
          xmlns='http://www.w3.org/2000/svg'
          width='26px'
          height='26px'
          viewBox='0 0 24.000000 24.000000'
          preserveAspectRatio='xMidYMid meet'>
          <g transform='translate(0.000000,24.000000) scale(0.100000,-0.100000)' fill='#222222'>
            <path
              fill='currentColor'
              d='M79 209 c-15 -15 -20 -29 -15 -50 5 -27 46 -99 56 -99 10 0 51 72 56 99 7 33 -23 71 -56 71 -11 0 -29 -9 -41 -21z m61 -39 c0 -13 -7 -20 -20 -20 -13 0 -20 7 -20 20 0 13 7 20 20 20 13 0 20 -7 20 -20z'
            />
            <path
              fill='currentColor'
              d='M30 64 c-11 -12 -10 -18 4 -32 24 -24 148 -24 172 0 14 14 15 20 4 32 -14 18 -50 22 -50 6 0 -5 7 -10 15 -10 8 0 15 -4 15 -10 0 -13 -64 -23 -105 -16 -34 7 -49 26 -20 26 8 0 15 5 15 10 0 16 -36 12 -50 -6z'
            />
          </g>
        </svg>
        <span>창고스팟</span>
      </Link>
      <Link
        href={'/warehouse'}
        className={cls(
          'flex flex-col items-center space-y-1.5',
          pathname.match('/warehouse') ? 'text-[#33CC99]' : 'transition-colors hover:text-gray-500'
        )}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 22 22'
          strokeWidth='1.4'
          stroke='currentColor'
          className='h-6 w-6'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9'
          />
        </svg>
        <span>창고공간</span>
      </Link>
      <Link
        href={'/chats'}
        className={cls(
          'flex flex-col items-center space-y-1.5',
          pathname.match('/chats') ? 'text-[#33CC99]' : 'transition-colors hover:text-gray-500'
        )}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 22 22'
          strokeWidth='1.5'
          stroke='currentColor'
          className='-mt-0.5 h-6 w-6'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z'
          />
        </svg>
        <span className={'pt-0.5'}>채팅</span>
      </Link>
      <Link
        href={'/profile'}
        className={cls(
          'flex flex-col items-center space-y-1.5',
          pathname.match('/profile') ? 'text-[#33CC99]' : 'transition-colors hover:text-gray-500'
        )}>
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'>
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
            d='M18.14 21.62c-.88.26-1.92.38-3.14.38H9c-1.22 0-2.26-.12-3.14-.38.22-2.6 2.89-4.65 6.14-4.65 3.25 0 5.92 2.05 6.14 4.65Z'
          />
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
            d='M15 2H9C4 2 2 4 2 9v6c0 3.78 1.14 5.85 3.86 6.62.22-2.6 2.89-4.65 6.14-4.65 3.25 0 5.92 2.05 6.14 4.65C20.86 20.85 22 18.78 22 15V9c0-5-2-7-7-7Zm-3 12.17c-1.98 0-3.58-1.61-3.58-3.59C8.42 8.6 10.02 7 12 7s3.58 1.6 3.58 3.58-1.6 3.59-3.58 3.59Z'
          />
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
            d='M15.58 10.58c0 1.98-1.6 3.59-3.58 3.59s-3.58-1.61-3.58-3.59C8.42 8.6 10.02 7 12 7s3.58 1.6 3.58 3.58Z'
          />
        </svg>
        <span>프로필</span>
      </Link>
    </nav>
  )
}

export default Lnb
