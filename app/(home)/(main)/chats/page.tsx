'use client'

import React from 'react'
import Link from 'next/link'

import Layout from '@/app/components/organism/layout/Layout'

const Chats = () => {
  return (
    <Layout hasHeader seoTitle={'채팅'}>
      <div className='mt-6 divide-y-[1px]'>
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Link href={`/chats/${i}`} key={_} className='flex items-center space-x-3 py-3'>
            <div className='h-12 w-12 rounded-full bg-slate-300' />
            <div className={'inline-block'}>
              <p className='text-[15px] text-gray-700'>내잔고</p>
              <p className='w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap text-xs text-gray-500'>
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
