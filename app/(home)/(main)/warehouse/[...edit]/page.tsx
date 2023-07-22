'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'

import BackHeader from '@/app/components/template/main/header/BackHeader'
import { CRUD } from '@/app/libs/client/constants/code'

const WarehouseEdit = () => {
  const searchParams = useSearchParams()

  const crud = searchParams.get('CRUD')
  const seq = searchParams.get('seq')
  const isEditMode = (crud === CRUD.수정 && seq !== '') || false

  console.log('isEditMode:', isEditMode)

  // useEffect(() => {
  //   if (isEditMode) {
  //   }
  // }, [editState])

  return (
    <>
      <BackHeader canGoBack title={`창고 ${isEditMode ? '편집' : '생성'}`} />
      <div className={'mt-8'}>{isEditMode ? '편집' : '생성'}</div>
    </>
  )
}

export default WarehouseEdit
