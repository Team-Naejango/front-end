'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'

import Layout from '@/app/components/template/main/layout/Layout'
import DealCard from '@/app/components/organism/profile/deal/DealCard'
import { DEAL } from '@/app/libs/client/reactQuery/queryKey/chat'

import { deal } from '@/app/apis/domain/chat/deal'

const Deal = () => {
  // 거래 조회
  const { data: { data: deals } = {} } = useQuery([DEAL.조회], deal, {
    refetchOnMount: 'always',
  })

  return (
    <Layout canGoBack title='거래 내역'>
      <div className='mt-8'>
        <DealCard deals={deals} />
      </div>
    </Layout>
  )
}

export default Deal
