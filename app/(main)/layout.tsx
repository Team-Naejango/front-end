'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

import { cls } from '@/app/libs/client/utils/util'
import Header from '@/app/components/template/main/Header'
import Nav from '@/app/components/template/main/Nav'
import BackHeader from '@/app/components/template/main/BackHeader'

interface LayoutProps {
  hasTabBar?: boolean
  children?: React.ReactNode
}

const Layout = ({ hasTabBar = true, children }: LayoutProps) => {
  const pathname = usePathname()

  console.log('pathname:', pathname)

  const HeaderTitle = (pathname: string) => {
    switch (pathname) {
      case '/notice':
        return '알림'
      default:
        return undefined
    }
  }

  return (
    <>
      {pathname === '/notice' ? (
        <BackHeader canGoBack title={HeaderTitle(pathname)} seoTitle={HeaderTitle(pathname)} />
      ) : (
        <Header />
      )}
      <section className={cls('h-[calc(100%-52px)] overflow-hidden pt-8', hasTabBar ? 'pb-24' : '')}>
        {children}
      </section>
      <Nav />
    </>
  )
}

export default Layout
