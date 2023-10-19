'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useRecoilState } from 'recoil'

import Splash from '@/app/components/molecule/common/Splash'
import { cls } from '@/app/libs/client/utils/util'
import CustomToast from '@/app/components/molecule/modal/CustomToast'
import { splashState } from '@/app/store/atom'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState<boolean>(() => pathname === '/' || false)
  const [isMountedSplash, setIsMountedSplash] = useRecoilState<boolean>(splashState)

  // 스플래시 on 감지
  useEffect(() => {
    setIsMountedSplash(true)
  }, [setIsMountedSplash])

  // 스플래시 on -> 로딩 off
  useEffect(() => {
    if (isMountedSplash) {
      setIsLoading(false)
    }
  }, [pathname])

  return (
    <main className='relative mx-auto h-[750px] w-[375px] max-w-xl overflow-visible bg-white'>
      <div
        className={cls(
          'h-inherit w-inherit absolute left-2/4 top-1/2 box-content translate-x-[-50%] translate-y-[-50%] overflow-x-hidden rounded-[30px] border-[10px] bg-transparent',
          isLoading ? 'border-white' : ''
        )}>
        <div
          className={cls(
            'h-inherit w-inherit relative mx-auto max-w-xl rounded-[30px] p-4',
            isLoading ? 'overflow-auto' : ''
          )}>
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
