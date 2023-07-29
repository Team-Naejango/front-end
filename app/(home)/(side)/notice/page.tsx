'use client'

import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import gsap from 'gsap'

import Layout from '@/app/components/template/main/layout/Layout'
import { splashState } from '@/app/store/atom'
import Link from 'next/link'

const Notice = () => {
  const isSplashMounted = useRecoilValue<boolean>(splashState)
  console.log('isSplashMounted:', isSplashMounted)

  useEffect(() => {
    gsap.fromTo(
      '.notice-wrapper',
      {
        x: '100%',
        duration: 0.5,
        opacity: 0,
      },
      {
        x: '0%',
        duration: 0.5,
        opacity: 1,
      }
    )
  }, [])

  return (
    <Layout canGoBack title='알림'>
      <div className='notice-wrapper h-inherit mt-12'>
        <div className='divide-y-[1px]'>
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <Link href={`/notice/${i}`} key={_} className='flex items-center space-x-3 px-4 py-3'>
              <div className='h-12 w-12 rounded-full bg-slate-300' />
              <div>
                <p className='text-[13px] hover:text-gray-500'>근처에 토스를 켠 사람이 있어요!</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Notice
