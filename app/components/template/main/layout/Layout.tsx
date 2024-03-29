'use client'

import React from 'react'

import Header from '@/app/components/template/main/header/Header'
import BackHeader from '@/app/components/template/main/header/BackHeader'
import Lnb from '@/app/components/template/main/lnb/Lnb'

interface LayoutProps {
  title?: string
  seoTitle?: string
  canGoBack?: boolean
  hasHeader?: boolean
  setting?: boolean
  onClick?: (event?: any) => void
  src?: string
  children: React.ReactNode
}

const Layout = ({ title, seoTitle, canGoBack, hasHeader, setting, onClick, src, children }: LayoutProps) => {
  return (
    <>
      {canGoBack ? (
        <BackHeader canGoBack title={title} seoTitle={seoTitle} onClick={onClick} />
      ) : hasHeader ? (
        <Header hasHeader={hasHeader} seoTitle={seoTitle} setting={setting} src={src} />
      ) : (
        <Header hasHeader={hasHeader} seoTitle={seoTitle} setting={setting} />
      )}
      <section className={'h-[calc(100%-3.5rem)] overflow-auto'}>{children}</section>
      <Lnb />
    </>
  )
}

export default Layout
