'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

import Layout from '@/app/components/template/main/layout/Layout'
import EventCarousel from '@/app/components/organism/home/EventCarousel'
import Button from '@/app/components/atom/Button'
import FloatingButton from '@/app/components/atom/FloatingButton'
import { OAUTH } from '@/app/libs/client/reactQuery/queryKey/auth'
import { CRUD } from '@/app/libs/client/constants/code'

import { userInfo } from '@/app/apis/domain/profile/profile'

async function getUser() {
  const response = await userInfo()
  return response
}

const Home = () => {
  const router = useRouter()

  const getUserInfo = async () => {
    const userInfo = await getUser()
    console.log('userInfo:', userInfo)
    return userInfo
  }

  const { data: getUserData } = useQuery([OAUTH.유저정보], () => userInfo())

  console.log('getUserData:', getUserData)

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <Layout hasHeader seoTitle={'홈'}>
      <div className='flex items-center justify-center'>
        <div className={'mt-8 w-full'}>
          <EventCarousel />
          <div className={'mt-[22rem] text-center'}>
            <p className={'text-[15px] font-medium'}>내 주변에서 물물교환을 하고 싶다면?</p>
            <Button small text={'탐색하기'} className={'!mt-4'} onClick={() => router.push('/places')} />
          </div>
          <FloatingButton
            href={{
              pathname: '/warehouse/detail/item/edit',
              query: {
                crud: CRUD.등록,
                seq: null,
              },
            }}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='currentColor'
              className='h-6 w-6'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
            </svg>
          </FloatingButton>
        </div>
      </div>
    </Layout>
  )
}

export default Home
