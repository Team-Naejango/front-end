'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import { Tab } from '@headlessui/react'

import Layout from '@/app/components/organism/layout/Layout'
import RoundedTab from '@/app/components/molecule/tab/RoundedTab'
import FloatingButton from '@/app/components/atom/FloatingButton'

const WareHouseItem = () => {
  const params = useParams()

  return (
    <Layout canGoBack title={`창고${params.id}`}>
      <div className='mt-8'>
        <RoundedTab />
        <FloatingButton href='/warehouse/item/1/create'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='2'
            stroke='currentColor'
            className='h-6 w-6'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  )
}

export default WareHouseItem
