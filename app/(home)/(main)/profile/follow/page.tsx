'use client'

import React, { useState } from 'react'
import Link from 'next/link'

import Layout from '@/app/components/template/main/layout/Layout'
import Button from '@/app/components/atom/Button'

const Follow = () => {
  return (
    <Layout canGoBack title='팔로우'>
      <div className={'mt-6'}>
        {...[0, 1, 2].map(value => {
          return (
            <div key={value} className='border-b py-6'>
              <div className='mb-3 flex cursor-pointer items-center space-x-3 px-2 pb-3'>
                <div className={'flex w-full items-center justify-between'}>
                  <div className={'flex items-center justify-center gap-2'}>
                    <div className='h-10 w-10 rounded-full bg-slate-300' />
                    <p className='text-[13px] font-medium'>내 잔고를 부탁해</p>
                  </div>
                  <Link href={'/profile/follow'}>
                    <Button
                      small
                      text={'팔로우 취소'}
                      className={
                        '!rounded-2xl !border-[#32D7A0] !bg-white !py-2 text-xs !text-[#222] hover:!bg-[#32D7A0] hover:!text-white'
                      }
                    />
                  </Link>
                </div>
              </div>
              <div className={'flex gap-2 px-2'}>
                <div className='h-24 w-24 rounded bg-slate-300' />
                <div className='h-24 w-24 rounded bg-slate-300' />
                <div className='h-24 w-24 rounded bg-slate-300' />
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default Follow
