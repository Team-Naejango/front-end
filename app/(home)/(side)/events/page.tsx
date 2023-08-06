import React from 'react'

import Layout from '@/app/components/template/main/layout/Layout'
import Banner from '@/app/components/molecule/banner/Banner'

const Events = () => {
  return (
    <Layout canGoBack title={'이벤트 목록'} seoTitle={'이벤트 목록'}>
      <div className='my-10'>
        <Banner />
      </div>
    </Layout>
  )
}

export default Events
