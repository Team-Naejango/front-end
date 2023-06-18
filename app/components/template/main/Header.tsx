'use client'

import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import gsap from 'gsap'

import noticeIcon from '@/app/assets/image/notice.svg'
import mapIcon from '@/app/assets/image/map.svg'

interface LayoutProps {
  title?: string
  seoTitle?: string
}

const Header = ({ title, seoTitle }: LayoutProps) => {
  const router = useRouter()

  const onClickNotice = () => {
    gsap.to('.notice-area', {
      onComplete: () => {
        router.push('/notice')
      },
    })
  }

  return (
    <>
      <Head>
        <title>{seoTitle} | 내 잔부를 부탁해</title>
      </Head>
      <header>
        <div className={'flex items-center justify-between bg-white pl-2 pr-1.5'}>
          <div>
            <span>근처동네</span>
            <div className='mt-1 flex items-center justify-center gap-1'>
              <Image src={mapIcon} alt={'지도 아이콘'} />
              <p className={'text-sm font-light text-[#8B8688]'}>서울, 여의도한강공원</p>
            </div>
          </div>
          <div
            role='presentation'
            onClick={onClickNotice}
            className={
              'notice-area flex h-12 w-12 cursor-pointer items-center justify-center rounded-md bg-[#F9F9F9] hover:bg-gray-100'
            }>
            <Image src={noticeIcon} alt={'알림 아이콘'} width={24} unoptimized />
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
