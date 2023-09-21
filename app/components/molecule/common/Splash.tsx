'use client'

import React, { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useSetRecoilState } from 'recoil'
import splashLogo from '@/app/assets/image/splash_logo_white.svg'

import { cls } from '@/app/libs/client/utils/util'
import { splashState } from '@/app/store/atom'

interface SplashProps {
  isMountedSplash: boolean
  closeSplash: () => void
}

const SplashScreen = ({ isMountedSplash, closeSplash }: SplashProps) => {
  const splashRef = useRef<HTMLDivElement>(null)
  const isSetSplashVisible = useSetRecoilState(splashState)

  const animateSplash = () => {
    const splash = gsap.timeline({
      onComplete: () => {
        closeSplash()
      },
    })

    // 타이틀 in
    splash.fromTo(
      '#splash',
      {
        y: '-50px',
        opacity: 0,
      },
      {
        y: '0px',
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      }
    )

    // 스플래쉬 out
    splash.fromTo(
      splashRef.current,
      { y: '0%' },
      {
        y: '-150%',
        delay: 1,
        duration: 0.7,
        ease: 'power1.out',
      }
    )
    return splash
  }

  useLayoutEffect(() => {
    const animation = animateSplash()
    return () => {
      animation.kill()
      isSetSplashVisible(true)
    }
  }, [])

  return (
    <div
      ref={splashRef}
      className={cls(
        'rounded-30px absolute left-0 top-0 flex h-full w-full items-center justify-center bg-gradient-to-b from-[#60C1CA] to-[#3EE4BD] p-4',
        isMountedSplash ? 'visible' : 'invisible'
      )}>
      <Image
        id='splash'
        src={splashLogo}
        alt={'스플래시 로고'}
        width={330}
        height={50}
        quality={100}
        style={{ objectFit: 'cover', width: 'auto', height: 'auto' }}
        priority
      />
    </div>
  )
}

export default SplashScreen
