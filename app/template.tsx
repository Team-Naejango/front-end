'use client'

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'

import { splashState } from '@/app/store/atom'
import Splash from '@/app/components/molecule/common/Splash'
import { cls } from '@/app/libs/client/utils/util'
import { modalSelector } from '@/app/store/modal'
import CustomAlert from '@/app/components/molecule/modal/CustomAlert'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(pathname === '/')
  const [isSplashMounted, setIsSplashMounted] = useRecoilState(splashState)
  const [alertTrueState, setAlertTrueState] = useRecoilState(modalSelector('testTrueAlert'))
  const [alertFalseState, setAlertFalseState] = useRecoilState(modalSelector('testFalseAlert'))

  console.log('alertTrueState:', alertTrueState)
  const prevUrl = typeof window === 'undefined' ? '' : window.location.pathname

  useEffect(() => {
    window.addEventListener('popstate', () => {
      if (isSplashMounted) {
        if (prevUrl !== '/') {
          router.back()
        } else {
          router.replace('/login')
        }
      }
    })
  }, [])

  useEffect(() => {
    setIsSplashMounted(true)
  }, [])

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

        {alertTrueState.modal.show ? <CustomAlert id={alertTrueState.modal.id} success /> : null}
        {alertFalseState.modal.show ? <CustomAlert id={alertFalseState.modal.id} success={false} /> : null}
      </div>
    </main>
  )
}
