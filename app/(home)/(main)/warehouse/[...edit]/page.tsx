'use client'

import React, { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
// import _ from 'underscore'

import BackHeader from '@/app/components/template/main/header/BackHeader'
import { CRUD } from '@/app/libs/client/constants/code'

const WarehouseEdit = () => {
  const searchParam = useSearchParams()
  const editState = searchParam.get('CRUD')
  const seqState = searchParam.get('seq')
  const edit = (editState === CRUD.수정 && seqState !== '') || false

  console.log('editState:', editState)

  // useEffect(() => {
  //   if (edit) {
  //   }
  // }, [editState])

  return (
    <>
      <BackHeader canGoBack title={`창고 ${edit ? '편집' : '생성'}`} />
      <div className={'mt-8'}>{edit ? '편집' : '생성'}</div>
    </>
  )
}

export default WarehouseEdit
