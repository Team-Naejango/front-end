'use client'

import React, { Suspense, useCallback, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import BackHeader from '@/app/components/template/main/header/BackHeader'
import { CRUD } from '@/app/libs/client/constants/code'
import Loading from '@/app/loading'
// import { headers } from 'next/headers'

// async function getData() {
//   const UserTest = () => {
//     const searchParam = useSearchParams()
//     const editState = searchParam.get('CRUD')
//     const seqState = searchParam.get('seq')
//     const edit = (editState === CRUD.수정 && seqState !== '') || false
//
//     return edit
//   }
//
//   // const authHeader = headers().get('authorization')
//   return UserTest()
// }

// interface pageProps {
//   params: { name: string }
// }

type Params = {
  params: {
    userId: string
  }
}
const WarehouseEdit = ({ params = { userId: '1' } }: Params) => {
  // const searchParam = useSearchParams()
  // const editState = searchParam.get('CRUD')

  // const data = getData()
  // console.log('data:', data)
  console.log('params:', params)
  // const getEditStatus = useCallback(() => {
  //   const editState = searchParam.get('CRUD')
  //   const seqState = searchParam.get('seq')
  //   const edit = (editState === CRUD.수정 && seqState !== '') || false
  //   return { edit }
  // }, [searchParam])
  //
  // const { edit } = getEditStatus()
  //
  // useEffect(() => {
  //   getEditStatus()
  // }, [])

  // useEffect(() => {
  //   const getCRUDValue = async () => {
  //     const editState = searchParam.get('CRUD')
  //     const seqState = searchParam.get('seq')
  //     const edit = (editState === CRUD.수정 && seqState !== '') || false
  //
  //     if (edit) {
  //       // 수정 페이지로 처리하는 로직
  //       console.log('This is the edit page.')
  //     } else {
  //       // 생성 페이지로 처리하는 로직
  //       console.log('This is the create page.')
  //     }
  //   }
  //
  //   getCRUDValue()
  // }, [searchParam])

  // console.log('editState:', editState)

  // useEffect(() => {
  //   if (edit) {
  //   }
  // }, [editState])

  return (
    <Suspense fallback={<Loading />}>
      <div>test</div>
      {/* <BackHeader canGoBack title={`창고 ${editState === CRUD.수정 ? '편집' : '생성'}`} /> */}
      {/* <div className={'mt-8'}>{editState === CRUD.수정 ? '편집' : '생성'}</div> */}
    </Suspense>
  )
}

export default WarehouseEdit
