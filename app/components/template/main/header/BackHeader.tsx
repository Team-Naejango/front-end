'use client'

import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import { useRecoilValue } from 'recoil'

import { cls } from '@/app/libs/client/utils/util'
import { splashState } from '@/app/store/atom'

interface LayoutProps {
  title?: string
  seoTitle?: string
  canGoBack?: boolean
  searchParams?: string
}

const BackHeader = ({ title, canGoBack, seoTitle, searchParams }: LayoutProps) => {
  const router = useRouter()
  const isSplashMounted = useRecoilValue(splashState)

  const prevUrl = typeof window === 'undefined' ? '' : window.location.pathname

  const onClickPrevUrl = () => {
    if (isSplashMounted) {
      if (prevUrl !== '/') {
        router.back()
      } else {
        router.replace('/login')
      }
    }
  }

  return (
    <>
      <Head>
        <title>{seoTitle} | 내 잔고를 부탁해</title>
      </Head>
      <div className='absolute left-0 top-0 z-[1000] mx-auto flex h-12 w-[375px] max-w-xl items-center justify-start rounded-[22px] bg-white px-10 indent-7 text-lg font-medium text-gray-800'>
        {canGoBack ? (
          <button onClick={onClickPrevUrl} className='absolute left-4'>
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
