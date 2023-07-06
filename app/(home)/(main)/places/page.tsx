'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import Layout from '@/app/components/organism/layout/Layout'
import KakaoMap from '@/app/components/molecule/common/KakaoMap'
import ItemCard from '@/app/components/organism/product/ItemCard'

interface ItemProps {
  title: string
  price: string
}

const dummyData: ItemProps[] = [
  { title: '삼다수 무라벨 2L 6개', price: '3,980' },
  { title: '5.1Kg (300g소분...', price: '38,900' },
  { title: '삼다수 무라벨 2L 6개', price: '3,480' },
  { title: '5.1Kg (300g소분...', price: '64,300' },
  { title: '모던리빙 호텔 수건 ...', price: '0' },
  { title: '비비안 고양이 패턴 ...', price: '999,999' },
]

const StoragePlaces = () => {
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

export default StoragePlaces
