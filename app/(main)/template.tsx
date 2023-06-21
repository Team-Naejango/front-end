'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

import { cls } from '@/app/libs/client/utils/util'
import Header from '@/app/components/template/main/header/Header'
import Lnb from '@/app/components/template/main/lnb/Lnb'
import BackHeader from '@/app/components/template/main/header/BackHeader'

interface LayoutProps {
  hasTabBar?: boolean
  children?: React.ReactNode
}

export default function Template({ hasTabBar = true, children }: LayoutProps) {
  const pathname = usePathname()

  console.log('pathname:', pathname)

  const HeaderTitle = (pathname: string) => {
    switch (pathname) {
      case '/notice':
        return '알림'
      case '/home':
        return '홈'
      case '/products':
        return '공동구매'
      case '/chats':
        return '채팅'
      case '/profile':
        return '프로필'
      default:
        return undefined
    }
  }

  return (
    <>
      {pathname === '/notice' ? (
        <BackHeader canGoBack title={HeaderTitle(pathname)} seoTitle={HeaderTitle(pathname)} />
      ) : (
        <Header seoTitle={HeaderTitle(pathname)} />
      )}
      <section className={cls('h-full overflow-hidden pt-8', hasTabBar ? 'pb-24' : '')}>{children}</section>
      <Lnb />
    </>
  )
}
