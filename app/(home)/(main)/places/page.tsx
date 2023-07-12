'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import Layout from '@/app/components/organism/layout/Layout'
import KakaoMap from '@/app/components/organism/place/KakaoMap'

const WareHousePlaces = () => {
  const router = useRouter()

  const onClickSearch = () => {
    // todo: searchParams 물고 가기
    router.push('/places/history')
  }

  return (
    <Layout hasHeader seoTitle={'창고스팟'}>
      <div className={'relative h-auto px-1.5'}>
        <KakaoMap />
      </div>
    </Layout>
  )
}

export default WareHousePlaces
