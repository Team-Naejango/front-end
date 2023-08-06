'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { ApiError } from 'next/dist/server/api-utils'

import Layout from '@/app/components/template/main/layout/Layout'
import EventCarousel from '@/app/components/organism/home/EventCarousel'
import Button from '@/app/components/atom/Button'
import FloatingButton from '@/app/components/atom/FloatingButton'
import { OAUTH } from '@/app/libs/client/reactQuery/queryKey/auth'
import { MemberInfo } from '@/app/apis/types/domain/auth/auth'
import { Response } from '@/app/apis/types/response/response'
import { getCookie } from '@/app/libs/client/utils/cookie'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store/common'

import { userInfo } from '@/app/apis/domain/profile/profile'
import { CRUD } from '@/app/libs/client/constants/code'

const Home = () => {
  const router = useRouter()

  /**
   * todo: 쿼리 캐싱 가비지컬렉션 처리
   * todo: 에러 핸들링 처리
   * */
  const { data: getUserData } = useQuery<Response<{ data: MemberInfo }>>([OAUTH.유저정보], () => userInfo())

  console.log('getUserData:', getUserData ?? [])

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
