'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { FiSettings } from 'react-icons/fi'

import { cls } from '@/app/libs/client/utils/util'
import Header from '@/app/components/template/main/header/Header'
import Lnb from '@/app/components/template/main/lnb/Lnb'
import BackHeader from '@/app/components/template/main/header/BackHeader'
import { useRecoilState } from 'recoil'
import { useModalStore } from '@/app/store/atom'
import { useModal } from '@/app/hooks/useModal'

interface LayoutProps {
  hasTabBar?: boolean
  children?: React.ReactNode
}

export default function Template({ hasTabBar = true, children }: LayoutProps) {
  const pathname = usePathname()
  const { closeModal } = useModal()
  const [modalState, setModalState] = useRecoilState(useModalStore)

  console.log('pathname:', pathname)

  // todo: 리팩토링 필요해보임
  const HeaderTitle = (pathname: string) => {
    switch (pathname) {
      case '/notice':
        return '알림'
      case '/products/search':
        return '상품 검색'
      case '/profile/edit':
        return '프로필 편집'
      case '/profile/sold':
        return '판매내역'
      case '/profile/bought':
        return '구매내역'
      case '/profile/loved':
        return '관심목록'
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

  const onClickModal = () => {
    setModalState({
      isOpen: true,
      title: '',
      content: '',
      callback: () => {
        closeModal()
      },
    })
  }

  return (
    <>
      {pathname.match('notice|search|profile/edit|bought|sold|loved') ? (
        <BackHeader canGoBack title={HeaderTitle(pathname)} seoTitle={HeaderTitle(pathname)} />
      ) : pathname.match('profile') ? (
        <FiSettings onClick={onClickModal} fontSize={'22px'} className={'absolute right-5 top-5 cursor-pointer'} />
      ) : (
        <Header seoTitle={HeaderTitle(pathname)} />
      )}
      <section className={cls('h-[calc(100%-120px)] overflow-auto pt-8')}>{children}</section>
      <Lnb />
    </>
  )
}
