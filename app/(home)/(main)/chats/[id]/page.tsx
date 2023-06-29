'use client'

import React from 'react'
import type { NextPage } from 'next'

import Layout from '@/app/components/organism/layout/Layout'
import Message from '@/app/components/atom/Message'

const ChatDetail: NextPage = () => {
  return (
    <Layout canGoBack title='내잔고'>
      <div className='mt-8 space-y-4 px-4 py-10 pb-16'>
        <Message message='미친놈을 보면 짓는 개' />
        <Message message='테스트테스트 테스트' reversed />
        <Message message='왈왈' />
        <form className='fixed inset-x-0 bottom-20 bg-white py-2'>
          <div className='relative mx-auto flex w-full  max-w-md items-center'>
            <input
              type='text'
              className='w-full rounded-full border-gray-300 pr-12 shadow-sm focus:border-[#33CC99] focus:outline-none focus:ring-[#33CC99]'
            />
            <div className='absolute inset-y-0 right-0 flex py-1.5 pr-1.5'>
              <button className='flex items-center rounded-full bg-[#33CC99] px-3 text-sm text-white hover:bg-[#32D7A0] focus:ring-2 focus:ring-[#33CC99] focus:ring-offset-2'>
                &rarr;
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default ChatDetail
