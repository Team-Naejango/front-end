'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Layout from '@/app/components/template/main/layout/Layout'
import SmallBanner from '@/app/components/molecule/banner/SmallBanner'
import { cls } from '@/app/libs/client/utils/util'

const Chats = () => {
  const router = useRouter()
  const [close, setClose] = useState<boolean>(false)

  const onClickBanner = () => {
    router.push('/events')
  }

  const onCloseBanner = () => {
    setClose(true)
  }

  return (
    <Layout hasHeader seoTitle={'채팅'}>
      <div className='mb-14 mt-4 divide-y-[1px]'>
        {!close && <SmallBanner onClick={onClickBanner} onClose={onCloseBanner} />}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((_, i) => (
          <Link
            href={`/chats/${i}`}
            key={_}
            className={cls('flex items-center space-x-3 py-3 hover:bg-[#eeeeee]', i === 0 ? '!border-t-0' : '')}>
            <div className='h-12 w-12 rounded-full bg-slate-300' />
            <div className={'inline-block'}>
              <p className='text-[15px] text-gray-700'>내잔고</p>
              <p className='mt-0.5 w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap text-xs text-gray-500'>
                테스트입니다테스트입니다테스트입니다테스트입니다.
              </p>
            </div>
            <div className={'flex w-16 flex-col items-end'}>
              <span className={'ml-8 text-xs'}>14:25</span>
              <span className={'mt-0.5 rounded-full bg-[#33CC99] px-[6px] py-[1px] text-center text-xs text-white'}>
                2
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export default Chats
