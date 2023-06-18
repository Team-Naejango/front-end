'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

import { cls } from '@/app/libs/client/utils/util'
import Header from '@/app/components/template/main/Header'
import Nav from '@/app/components/template/main/Nav'
import BackHeader from '@/app/components/template/main/BackHeader'

interface LayoutProps {
  title?: string
  seoTitle?: string
  canGoBack?: boolean
  hasTabBar?: boolean
  children?: React.ReactNode
}

const MainLayout = ({ title, canGoBack, hasTabBar = true, children, seoTitle }: LayoutProps) => {
  const pathname = usePathname()

  console.log('pathname:', pathname)

  return (
    <>
      {pathname === '/notice' ? <BackHeader canGoBack title={title} seoTitle={seoTitle} /> : <Header />}
      <section className={cls('h-full pt-8', hasTabBar ? 'pb-24' : '')}>{children}</section>
      <Nav />
    </>
  )
}

export default MainLayout
