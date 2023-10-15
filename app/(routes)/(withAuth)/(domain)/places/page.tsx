'use client'

import React from 'react'

import Layout from '@/app/components/template/main/layout/Layout'
import KakaoMap from '@/app/components/organism/place/KakaoMap'

const WareHousePlaces = () => {
  return (
    <Layout hasHeader seoTitle={'창고스팟'}>
      <div className={'relative h-auto px-1.5'}>
        <KakaoMap />
      </div>
    </Layout>
  )
}

export default WareHousePlaces
