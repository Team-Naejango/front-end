'use client'

import React, { useEffect } from 'react'
import gsap from 'gsap'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'

import Layout from '@/app/components/template/main/layout/Layout'
import { NOTICE } from '@/app/libs/client/reactQuery/queryKey/common'

import { notification } from '@/app/apis/domain/common/alarm'

const Notice = () => {
  // 창고 조회
  const { data: { data: alarms } = {} } = useQuery([NOTICE.조회], notification)

  const pageAnimation = () => {
    gsap.fromTo(
      '.notice-wrapper',
      {
        x: '100%',
        duration: 0.5,
        opacity: 0,
      },
      {
        x: '0%',
        duration: 0.5,
        opacity: 1,
      }
    )
  }

  useEffect(() => {
    pageAnimation()
  }, [])

  return (
    <Layout canGoBack title='알림'>
      <div className='notice-wrapper h-inherit mt-12'>
        <div className='divide-y-[1px]'>
          {alarms?.result.map(value => (
            <Link href={`/notice`} key={value.id} className='flex items-center space-x-3 px-4 py-3'>
              <div className='h-12 w-12 rounded-full bg-slate-300' />
              <div>
                <p className='text-[13px] hover:text-gray-500'>{value.content}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Notice
