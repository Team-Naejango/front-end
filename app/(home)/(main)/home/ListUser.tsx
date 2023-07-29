'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'

import Layout from '@/app/components/template/main/layout/Layout'
import EventCarousel from '@/app/components/organism/home/EventCarousel'
import Button from '@/app/components/atom/Button'
import FloatingButton from '@/app/components/atom/FloatingButton'
import { OAUTH } from '@/app/libs/client/reactQuery/queryKey'
import { MemberInfo } from '@/app/apis/types/domain/auth/auth'

import { userInfo } from '@/app/apis/domain/profile/profile'

// async function getUserInfo() {
//   const query = new QueryClient()
//   try {
//     await query.prefetchQuery<{ user: MemberInfo }>([OAUTH.유저정보], () => userInfo())
//     return {
//       dehydratedState: dehydrate(query),
//     }
//   } catch (error) {
//     console.log('프리패치 에러:', error)
//     return {}
//   }
// }

const ListUser = ({ user }: { user?: any }) => {
  const router = useRouter()

  // const { data: getUserData } = useQuery([OAUTH.유저정보], () => getUsers(), {
  //   initialData: user,
  // })
  // console.log('getUserData:', getUserData)

  return (
    <Layout hasHeader seoTitle={'홈'}>
      <div className='flex items-center justify-center'>
        <div className={'mt-8 w-full'}>
          <EventCarousel />
          <div className={'mt-[21.5rem] text-center'}>
            <p className={'text-[15px] font-medium'}>내 주변에서 물물교환을 하고 싶다면?</p>
            <Button smail text={'탐색하기'} className={'!ml-0 mt-4'} onClick={() => router.push('/places')} />
          </div>
          <FloatingButton href='/warehouse/item/create'>
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

export default ListUser
