'use client'

import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { useRouter } from 'next/navigation'
// import { useQuery } from '@tanstack/react-query'

import { kakaoAccessToken } from '@/app/store/atom'
import { MODAL_TYPES } from '@/app/libs/client/constants/code'
import { useModal } from '@/app/hooks/useModal'
import Layout from '@/app/components/template/main/layout/Layout'
import EventCarousel from '@/app/components/organism/home/EventCarousel'
import Button from '@/app/components/atom/Button'
import FloatingButton from '@/app/components/atom/FloatingButton'

// import { userInfo } from '@/app/apis/domain/profile/profile'
// import { OAUTH } from '@/app/libs/client/reactQuery/queryKey'

// export async function getServerSideProps() {
//   const UseGetUserData = async () => {
//     const { data, error } = await useQuery(['test'], userInfo)
//     return { data, error }
//   }
//
//   const { data: getUserDataResult, error } = await UseGetUserData()
//
//   if (error) {
//     console.log('Error while fetching user data:', error)
//   }
//
//   return {
//     props: {
//       getUserData: getUserDataResult,
//     },
//   }
// }

const Home = () => {
  const router = useRouter()
  const { openModal } = useModal()
  const accessToken = useRecoilValue(kakaoAccessToken)

  const onClickShowTrueAlert = () => {
    openModal({ modal: { id: 'testTrueAlert', type: MODAL_TYPES.ALERT }, callback: () => {} })
  }
  const onClickShowFalseAlert = () => {
    openModal({ modal: { id: 'testFalseAlert', type: MODAL_TYPES.ALERT }, callback: () => {} })
  }

  console.log('accessToken:', accessToken)
  // const { data: getUserData, isLoading, isError } = useQuery([OAUTH.유저정보], () => userInfo(accessToken))
  // console.log('getUserData:', getUserData)

  // const x = async () => {
  //   return fetch('http://43.202.25.203:8080/api/user/profile', {
  //     method: 'GET',
  //     headers: {
  //       Authorization: accessToken!,
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(response => {
  //       console.log('response.data:', response.data)
  //     })
  //     .catch(error => {
  //       // 에러 처리 코드를 작성합니다.
  //       console.error(error)
  //     })
  // }

  // axios
  //   .get('http://43.202.25.203:8080/api/user/profile', {
  //     headers: {
  //       Authorization: accessToken,
  //     },
  //   })
  //   .then(response => {
  //     console.log('response.data:', response)
  //   })
  //   .catch(error => {
  //     console.error(error)
  //   })

  // useEffect(() => {
  //   x()
  // }, [])

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
      {/* <div className={'mx-auto mt-80 flex w-[80%] gap-4'}> */}
      {/* <Button smail onClick={() => onClickShowTrueAlert()} text={'성공 버튼'} /> */}
      {/* <Button */}
      {/*   smail */}
      {/*   className={'!bg-red-500 hover:!bg-[#F05454] focus:!ring-red-500'} */}
      {/*   onClick={() => onClickShowFalseAlert()} */}
      {/*   text={'실패 버튼'} */}
      {/* /> */}
      {/* </div> */}
    </Layout>
  )
}

export default Home
