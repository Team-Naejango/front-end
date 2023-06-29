'use client'

import React from 'react'

import Header from '@/app/components/template/main/header/Header'
import BackHeader from '@/app/components/template/main/header/BackHeader'
import Lnb from '@/app/components/template/main/lnb/Lnb'
import { cls } from '@/app/libs/client/utils/util'

interface LayoutProps {
  title?: string
  seoTitle?: string
  canGoBack?: boolean
  hasHeader?: boolean
  children: React.ReactNode
}

const Layout = ({ title, canGoBack, hasHeader, children, seoTitle }: LayoutProps) => {
  return (
    <>
      {canGoBack ? (
        <BackHeader canGoBack title={title} seoTitle={seoTitle} />
      ) : hasHeader ? (
        <Header hasHeader={hasHeader} seoTitle={seoTitle} />
      ) : (
        <Header hasHeader={hasHeader} seoTitle={seoTitle} />
      )}
      <section className={cls('h-[calc(100%-112px)] overflow-auto')}>{children}</section>
      <Lnb />
    </>
  )
}

export default Layout
