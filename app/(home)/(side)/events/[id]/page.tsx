import React from 'react'

import Layout from '@/app/components/organism/layout/Layout'

const EventDetail = () => {
  return (
    <Layout canGoBack title={'이벤트 상세'} seoTitle={'이벤트 상세'}>
      <div className='flex h-[100%] items-center justify-center'>이벤트 상세 페이지</div>
    </Layout>
  )
}

export default EventDetail
