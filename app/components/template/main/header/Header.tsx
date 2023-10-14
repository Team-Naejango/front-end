'use client'

import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { FiSettings } from 'react-icons/fi'
import mapIcon from '@/app/assets/image/map.svg'
import alarmIcon from '@/app/assets/image/alarm.svg'

import { cls } from '@/app/libs/client/utils/util'
import { COMMON_STORE_KEY } from '@/app/libs/client/constants/store/common'

interface LayoutProps {
  seoTitle: string | undefined
  hasHeader?: boolean
  setting?: boolean
  src?: string
}

const Header = ({
  seoTitle,
  hasHeader = true,
  setting = false,
  src = 'https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/assets/face2%402x.png',
}: LayoutProps) => {
  const router = useRouter()

  const address = typeof localStorage === 'undefined' ? undefined : localStorage.getItem(COMMON_STORE_KEY.주소)

  const onMoveAlarm = () => {
    if (setting) return
    router.push('/alarms')
  }

  return (
    <>
      <Head>
        <title>{seoTitle} | 내 잔고를 부탁해</title>
      </Head>
      {hasHeader ? (
        <header>
          <div className={'flex items-center justify-between rounded-[30px] bg-white pb-4 pl-2'}>
            <div>
              <span>근처동네</span>
              <div className='mt-1 flex items-center justify-center gap-1'>
                <Image src={mapIcon} alt={'지도 아이콘'} />
                <p className={'text-sm font-light text-[#8B8688]'}>{address || '현재 위치'}</p>
              </div>
            </div>
            <div
              role='presentation'
              onClick={onMoveAlarm}
              className={cls(
                'relative flex h-12 w-12 items-center justify-center bg-[#f5f5f5] hover:bg-[#f0f0f0]',
                setting ? 'rounded-full' : 'cursor-pointer rounded-md'
              )}>
              {setting ? (
                <Image
                  src={src}
                  priority
                  width={'100'}
                  height={'100'}
                  quality={100}
                  alt='프로필 이미지'
                  className={cls(
                    'absolute h-full w-full rounded-full border object-cover',
                    src === 'https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/assets/face2%402x.png'
                      ? 'bg-gray-300'
                      : 'border-[#ddd]'
                  )}
                />
              ) : (
                <Image src={alarmIcon} alt={'알림 아이콘'} width={24} />
              )}
            </div>
          </div>
        </header>
      ) : (
        <FiSettings className={'absolute right-5 top-5 cursor-pointer text-[22px]'} />
      )}
    </>
  )
}

export default Header
