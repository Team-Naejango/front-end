'use client'

import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/navigation'

import { cls } from '@/app/libs/client/utils/util'

interface LayoutProps {
  title?: string
  seoTitle?: string
  canGoBack?: boolean
  onClick?: (event?: any) => void
}

const BackHeader = ({ title, canGoBack, seoTitle, onClick }: LayoutProps) => {
  const router = useRouter()

  // 뒤로가기
  const onBack = () => {
    if (onClick) return onClick()
    router.back()
  }

  return (
    <>
      <Head>
        <title>{seoTitle} | 내 잔고를 부탁해</title>
      </Head>
      <div className='absolute left-0 top-0 z-[1000] mx-auto flex h-12 w-[375px] max-w-xl items-center justify-start rounded-[22px] bg-white px-10 indent-7 text-lg font-medium text-gray-800'>
        {canGoBack ? (
          <button onClick={onBack} className='absolute left-4 text-[#222] hover:text-[#666]'>
            <svg
              className='h-6 w-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 19l-7-7 7-7' />
            </svg>
          </button>
        ) : null}
        {title ? <span className={cls(canGoBack ? 'items-start justify-items-start' : '', '')}>{title}</span> : null}
      </div>
    </>
  )
}

export default BackHeader
