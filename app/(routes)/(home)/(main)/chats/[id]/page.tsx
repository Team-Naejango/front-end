'use client'

import React, { useEffect, useRef } from 'react'
import type { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import Layout from '@/app/components/template/main/layout/Layout'
import Message from '@/app/components/atom/Message'

interface MessageForm {
  message: string
}

const ChatDetail: NextPage = () => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const { register, watch, handleSubmit, reset } = useForm<MessageForm>()

  const dummyData = [
    { message: '미친놈을 보면 짓는 개', reversed: false },
    { message: '테스트테스트 테스트', reversed: true },
    { message: '왈왈', reversed: false },
  ]

  const onValid = (form: MessageForm) => {
    toast.error('개발중')
    reset()
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView()
  }, [])

  return (
    <Layout canGoBack title='내잔고'>
      <div className='mt-8 space-y-4 py-10 pb-16'>
        {dummyData.map(data => {
          return <Message key={data.message} message={data.message} reversed={data.reversed} />
        })}
        <div ref={scrollRef} />
        <form onSubmit={handleSubmit(onValid)} className='fixed inset-x-4 bottom-20 bg-white py-2'>
          <div className='relative mx-auto flex w-full  max-w-md items-center'>
            <input
              type='text'
              {...register('message', { required: true })}
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
