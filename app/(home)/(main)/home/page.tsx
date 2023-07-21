'use client'

import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
// import { useQuery } from '@tanstack/react-query'

import { kakaoAccessToken } from '@/app/store/atom'
import { MODAL_TYPES } from '@/app/libs/client/constants/code'
import { useModal } from '@/app/hooks/useModal'
import Layout from '@/app/components/organism/layout/Layout'
import EventCarousel from '@/app/components/organism/home/EventCarousel'
import Button from '@/app/components/atom/Button'
// import { userInfo } from '@/app/apis/domain/profile/profile'
// import { OAUTH } from '@/app/libs/client/reactQuery/queryKey'

// export async function getServerSideProps() {
//   // getUserData 함수를 getServerSideProps 함수 외부로 이동합니다.
//   const UseGetUserData = async () => {
//     const { data, error } = await useQuery(['test'], userInfo)
//     return { data, error }
//   }
//
//   // getUserData를 호출하여 데이터를 가져오는 부분
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

const Home = ({ propsData }: any) => {
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

  // useEffect(() => {
  //   x()
  // }, [])

  // axios
  //   .get('http://43.202.25.203:8080/api/user/profile', {
  //     headers: {
  //       Authorization: accessToken,
  //     },
  //   })
  //   .then(response => {
  //     // 받아온 JSON 데이터를 처리하는 코드를 작성합니다.
  //     console.log('response.data:', response)
  //   })
  //   .catch(error => {
  //     // 에러 처리 코드를 작성합니다.
  //     console.error(error)
  //   })

  return (
    <Layout hasHeader seoTitle={'홈'}>
      <div className='flex items-center justify-center'>
        <div className={'mt-8 w-full'}>
          <EventCarousel />
          <div className={'mx-auto mt-80 flex w-[80%] gap-4'}>
            <Button smail onClick={() => onClickShowTrueAlert()} text={'성공 버튼'} />
            <Button
              smail
              className={'!bg-red-500 hover:!bg-[#F05454] focus:!ring-red-500'}
              onClick={() => onClickShowFalseAlert()}
              text={'실패 버튼'}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
