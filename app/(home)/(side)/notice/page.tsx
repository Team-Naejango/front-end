'use client'

import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import gsap from 'gsap'

import { splashState } from '@/app/store/atom'
import Layout from '@/app/components/organism/layout/Layout'

const Notice = () => {
  const isSplashMounted = useRecoilValue(splashState)
  console.log('isSplashMounted:', isSplashMounted)

  useEffect(() => {
    gsap.fromTo(
      '.notice-wrapper',
      {
        x: '100%',
        duration: 0.5,
      },
      {
        x: '0%',
        duration: 0.5,
      }
    )
  }, [])

  return (
    <Layout canGoBack title='알림'>
      <div className='notice-wrapper h-full w-full'>
        <div className='flex h-full items-center justify-center'>
          <p>알림 페이지</p>
        </div>
      </div>
    </Layout>
  )
}

export default Notice
