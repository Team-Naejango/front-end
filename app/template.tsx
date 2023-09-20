'use client'

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'

import Splash from '@/app/components/molecule/common/Splash'
import { splashState } from '@/app/store/atom'
import { cls } from '@/app/libs/client/utils/util'
import CustomToast from '@/app/components/molecule/modal/CustomToast'
import { getCookie } from '@/app/libs/client/utils/cookie'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store/common'
import { useClearSession } from '@/app/hooks/useClearSession'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { resetToken } = useClearSession()
  const [isLoading, setIsLoading] = useState<boolean>(pathname === '/')
  const [isSplashMounted, setIsSplashMounted] = useRecoilState<boolean>(splashState)

  const accessToken = getCookie(AUTH_TOKEN.접근)
  const refreshToken = getCookie(AUTH_TOKEN.갱신)

  useEffect(() => {
    const onBeforeUnload = () => {
      if (accessToken && !refreshToken) return resetToken()
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload)
    }
  }, [])

  useEffect(() => {
    if (isSplashMounted) {
      const onBack = () => {
        window.addEventListener('popstate', () => {
          pathname === '/' ? router.replace('/login') : router.back()
        })
      }
      window.addEventListener('popstate', onBack)
      return () => {
        window.removeEventListener('popstate', onBack)
      }
    }
  }, [])

  useEffect(() => {
    setIsSplashMounted(true)
  }, [setIsSplashMounted])

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
