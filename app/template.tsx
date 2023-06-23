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
    <main
      className={cls(
        'after:w-50 after:h-50 relative z-10 mx-auto h-[750px] w-[375px] max-w-xl overflow-visible bg-white after:absolute after:left-2/4 after:top-1/2 after:z-[-1] after:box-content after:block after:h-[750px] after:w-[375px] after:translate-x-[-50%] after:translate-y-[-50%] after:rounded-[30px] after:border-[10px] after:border-white after:bg-transparent after:content-[""]'
      )}>
      <div
        className={cls(
          'relative mx-auto h-[750px] w-[375px] max-w-xl rounded-[30px] p-4',
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
    </main>
  )
}
