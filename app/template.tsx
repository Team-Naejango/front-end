'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useRecoilState } from 'recoil'
import Image from 'next/image'
import naejangoBg from '@/app/assets/image/naejango_bg.svg'

import Splash from '@/app/components/molecule/common/Splash'
import { cls } from '@/app/libs/client/utils/util'
import CustomToast from '@/app/components/molecule/modal/CustomToast'
import { splashState } from '@/app/store/atom'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isMountedSplash, setIsMountedSplash] = useRecoilState<boolean>(splashState)

  // 스플래시 on 감지
  useEffect(() => {
    setIsMountedSplash(true)
    setIsLoading(true)
  }, [setIsMountedSplash])

  // 스플래시 on -> 로딩 off
  useEffect(() => {
    if (isMountedSplash) {
      setIsLoading(false)
    }
  }, [isMountedSplash])

  return (
    <main id='main'>
      <div className={'bg-area'}>
        <Image priority quality={100} src={naejangoBg} alt={'내 잔고를 부탁해 배경 이미지'} />
      </div>
      <div className={'title-content'}>
        <p className={'sub-title'}>공동구매 및 중고거래 플랫폼</p>
        <h1 className={'main-title'}>내 잔고를 부탁해</h1>
      </div>
      <div className={cls('wrapper', isLoading ? '!border-white' : '')}>
        <div className={cls('main-container', isLoading ? 'overflow-auto' : 'overflow-hidden')}>
          {isLoading && isMountedSplash ? (
            <Splash
              closeSplash={() => {
                setIsLoading(false)
              }}
              isMountedSplash={isMountedSplash}
            />
          ) : (
            children
          )}
        </div>
      </div>
      {/* toast */}
      <CustomToast />
    </main>
  )
}
