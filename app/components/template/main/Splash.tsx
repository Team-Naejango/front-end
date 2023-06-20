'use client'

import React, { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

import { cls } from '@/app/libs/client/utils/util'
import splashLogo1 from '@/app/assets/image/NaeJanGo.svg'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { splashState } from '@/app/store/atom'
// import splashLogo2 from '@/app/assets/image/NaeJanGo_white.svg'

const SplashScreen = ({ finishLoading, isSplashMounted }: { finishLoading: () => void; isSplashMounted: boolean }) => {
  const splashRef = useRef<HTMLDivElement>(null)
  const isSetSplashVisible = useSetRecoilState(splashState)

  const animateSplash = () => {
    const splash = gsap.timeline({
      onComplete: () => {
        finishLoading()
      },
    })

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

    splash.fromTo(
      splashRef.current,
      { y: '0%', opacity: 1 },
      {
        y: '-70px',
        delay: 1,
        duration: 0.5,
        opacity: 0,
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
        'absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-[30px] bg-[#fff] p-4',
        isSplashMounted ? 'visible' : 'invisible'
      )}>
      <Image
        id='splash'
        src={splashLogo1}
        alt={'스플래시 로고'}
        width={330}
        height={50}
        quality={100}
        style={{ objectFit: 'cover' }}
        priority
      />
    </div>
  )
}

export default SplashScreen
