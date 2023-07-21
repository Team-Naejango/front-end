import React from 'react'
import BackHeader from '@/app/components/template/main/header/BackHeader'

const WarehouseEdit = () => {
  return (
    <>
      <BackHeader canGoBack title={`창고 ${'생성 or 편집'}`} />
      <div className={'mt-8'}>창고 생성 및 편집 페이지</div>
    </>
  )
}

export default WarehouseEdit
