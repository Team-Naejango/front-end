'use client'

import React, { Fragment } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { FiSettings } from 'react-icons/fi'

import { useModal } from '@/app/hooks/useModal'
// import { useModalStore } from '@/app/store/atom'
import noticeIcon from '@/app/assets/image/notice.svg'
import mapIcon from '@/app/assets/image/map.svg'
import DropDown from '@/app/components/atom/DropDown'
import { Menu } from '@headlessui/react'
import Link from 'next/link'
import { cls } from '@/app/libs/client/utils/util'

interface LayoutProps {
  seoTitle: string | undefined
  hasHeader?: boolean
  setting?: boolean
}

const Header = ({ seoTitle, hasHeader = true, setting = false }: LayoutProps) => {
  const router = useRouter()
  // const { closeModal } = useModal('')
  // const [modalState, setModalState] = useRecoilState(useModalStore)

  const onShowModal = () => {
    // setModalState({
    //   isOpen: true,
    //   title: '',
    //   content: '',
    //   callback: () => {
    //     closeModal()
    //   },
    // })
  }

  const onClickNotice = () => {
    if (setting) return
    router.push('/notice')
  }

  return (
    <>
      <Head>
        <title>{seoTitle} | 내 잔고를 부탁해</title>
      </Head>
      {hasHeader ? (
        <header>
          <div className={'flex items-center justify-between bg-white pl-2'}>
            <div>
              <span>근처동네</span>
              <div className='mt-1 flex items-center justify-center gap-1'>
                <Image src={mapIcon} alt={'지도 아이콘'} />
                <p className={'text-sm font-light text-[#8B8688]'}>서울, 여의도한강공원</p>
              </div>
            </div>
            <div
              role='presentation'
              onClick={onClickNotice}
              className={cls(
                'relative flex h-12 w-12 cursor-pointer items-center justify-center bg-[#f9f9f9] hover:bg-gray-100',
                setting ? 'rounded-full' : 'rounded-md'
              )}>
              {setting ? (
                <div className={'absolute h-full w-full rounded-full bg-emerald-500'} />
              ) : (
                <Image src={noticeIcon} alt={'알림 아이콘'} width={24} />
              )}
            </div>
          </div>
        </header>
      ) : (
        <FiSettings onClick={onShowModal} className={'absolute right-5 top-5 cursor-pointer text-[22px]'} />
      )}
    </>
  )
}

export default Header
