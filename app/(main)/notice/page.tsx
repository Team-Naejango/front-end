'use client'

import React, { useEffect } from 'react'
import gsap from 'gsap'
import { useRecoilValue } from 'recoil'

import { splashState } from '@/app/store/atom'

const Notice = () => {
  const isWaitSplashComplete = useRecoilValue(splashState)
  console.log('isWaitSplashComplete:', isWaitSplashComplete)

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
    <div className='notice-wrapper h-full w-full'>
      <div className='flex h-full items-center justify-center'>
        <p>알림 페이지</p>
      </div>
    </div>
  )
}

export default Notice
