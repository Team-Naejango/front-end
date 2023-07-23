import React from 'react'

import Layout from '@/app/components/template/main/layout/Layout'
import Banner from '@/app/components/molecule/banner/Banner'

const Events = () => {
  return (
    <Layout canGoBack title={'이벤트 목록'} seoTitle={'이벤트 목록'}>
      <div className='flex h-[100%] items-center justify-center'>
        이벤트 페이지
        {/* <Banner /> */}
      </div>
    </Layout>
  )
}

export default Events
