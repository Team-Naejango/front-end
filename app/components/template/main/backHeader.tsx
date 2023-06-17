import React from 'react'
import Head from 'next/head'
import { cls } from '@/app/libs/client/utils/util'
import { useRouter } from 'next/navigation'

interface LayoutProps {
  title?: string
  seoTitle?: string
  canGoBack?: boolean
}

const BackHeader = ({ title, canGoBack, seoTitle }: LayoutProps) => {
  const router = useRouter()

  const onClick = () => {
    router.back()
  }

  return (
    <>
      <Head>
        <title>{seoTitle} | 내 잔부를 부탁해</title>
      </Head>
      <div className='absolute left-0 top-0 m-5 mx-auto flex h-12 w-[375px] max-w-xl items-center justify-start rounded-[22px] bg-white px-10 indent-7 text-lg font-medium text-gray-800'>
        {canGoBack ? (
          <button onClick={onClick} className='absolute left-4'>
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
