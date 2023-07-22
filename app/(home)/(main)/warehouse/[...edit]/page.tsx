'use client'

import React, { useCallback, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import BackHeader from '@/app/components/template/main/header/BackHeader'
import { CRUD } from '@/app/libs/client/constants/code'

const WarehouseEdit = () => {
  const searchParam = useSearchParams()

  const getEditStatus = useCallback(() => {
    const editState = searchParam.get('CRUD')
    const seqState = searchParam.get('seq')
    const edit = (editState === CRUD.수정 && seqState !== '') || false
    return { edit }
  }, [])

  const { edit } = getEditStatus()

  useEffect(() => {
    getEditStatus()
  }, [])

  // console.log('editState:', editState)

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
