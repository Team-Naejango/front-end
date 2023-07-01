'use client'

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'

import { splashState, useModalStore } from '@/app/store/atom'
import Splash from '@/app/components/molecule/common/Splash'
import { cls } from '@/app/libs/client/utils/util'
import CustomDialog from '@/app/components/molecule/modal/CustomDialog'
import { OpenModalProps, useModal } from '@/app/hooks/useModal'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(pathname === '/')
  const [isSplashMounted, setIsSplashMounted] = useRecoilState(splashState)
  const { openModal, closeModal } = useModal()
  const [modalState, setModalState] = useRecoilState(useModalStore)

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
      <div className='h-inherit w-inherit absolute left-2/4 top-1/2 box-content translate-x-[-50%] translate-y-[-50%] rounded-[30px] border-[10px] border-white bg-transparent'>
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
        {modalState.isOpen ? <CustomDialog show={modalState.isOpen} onHide={closeModal} /> : null}
      </div>
    </main>
  )
}
