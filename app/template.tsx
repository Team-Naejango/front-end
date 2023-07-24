'use client'

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'

import { splashState } from '@/app/store/atom'
import Splash from '@/app/components/molecule/common/Splash'
import { cls } from '@/app/libs/client/utils/util'
import CustomToast from '@/app/components/molecule/modal/CustomToast'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(pathname === '/')
  const [isSplashMounted, setIsSplashMounted] = useRecoilState(splashState)

  useEffect(() => {
    if (isSplashMounted) {
      const handleBackButton = () => {
        window.addEventListener('popstate', () => {
          pathname !== '/' ? router.back() : router.replace('/login')
        })
      }
      return () => {
        window.removeEventListener('popstate', handleBackButton)
      }
    }
  }, [isSplashMounted, pathname, router])

  useEffect(() => {
    setIsSplashMounted(true)
  }, [setIsSplashMounted])

  return (
    <main className='relative mx-auto h-[750px] w-[375px] max-w-xl overflow-visible bg-white'>
      <div
        className={cls(
          'h-inherit w-inherit absolute left-2/4 top-1/2 box-content translate-x-[-50%] translate-y-[-50%] rounded-[30px] border-[10px] bg-transparent',
          isLoading ? 'border-white' : ''
        )}>
        <div
          className={cls(
            'h-inherit w-inherit relative mx-auto max-w-xl rounded-[30px] p-4',
            isLoading ? 'overflow-auto' : ''
          )}>
          {isLoading && isSplashMounted ? (
            <Splash
              closeSplash={() => {
                setIsLoading(false)
              }}
              isSplashMounted={isSplashMounted}
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
