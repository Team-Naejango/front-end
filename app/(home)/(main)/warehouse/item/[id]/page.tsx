'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'

import Layout from '@/app/components/organism/layout/Layout'
import RoundedTab from '@/app/components/molecule/tab/RoundedTab'
import FloatingButton from '@/app/components/atom/FloatingButton'

const WareHouseItem = () => {
  const params = useParams()

  const [categories] = useState({
    BUY: [
      {
        id: 1,
        category: '식품',
        title: '모던리빙 호텔 수건 180g 코마사 40수 세트',
      },
      {
        id: 2,
        category: '식품',
        title: '비비안 고양이 패턴 남성 파자마 잠옷 세트',
      },
      {
        id: 3,
        category: '식품',
        title: '삼다수 무라벨 2L 6개',
      },
      {
        id: 4,
        category: '식품',
        title: '모던리빙 호텔 수건 180g 코마사 40수 세트',
      },
      {
        id: 5,
        category: '식품',
        title: '삼다수 무라벨 2L 6개',
      },
    ],
    SELL: [
      {
        id: 1,
        category: '식품',
        title: '비비안 고양이 패턴 남성 파자마 잠옷 세트',
      },
      {
        id: 2,
        category: '식품',
        title: '모던리빙 호텔 수건 180g 코마사 40수 세트',
      },
    ],
  })

  // todo: 삭제 팝업창과 delete api 추가
  const onDeleteProduct = () => {}

  return (
    <Layout canGoBack title={`창고${params.id}`}>
      <div className='mt-10'>
        <RoundedTab categories={categories as any} onDelete={onDeleteProduct} />
        <FloatingButton href='/warehouse/item/create'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='h-8 w-8'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  )
}

export default WareHouseItem
