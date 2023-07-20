'use client'

import React, { useState } from 'react'

import Layout from '@/app/components/organism/layout/Layout'
import RadioPicker, { DataTypes } from '@/app/components/molecule/tab/RadioTab'
import Button from '@/app/components/atom/Button'

const points: DataTypes[] = [
  {
    name: '50 포인트',
    value: '10,000원',
  },
  {
    name: '70 포인트',
    value: '14,000원',
  },
  {
    name: '100 포인트',
    value: '100,000원',
  },
  {
    name: '999 포인트',
    value: '999,999,999원',
  },
  {
    name: '10,000 포인트',
    value: '0원',
  },
]

const PointCharge = () => {
  const [selectedPoint, setSelectedPoint] = useState<DataTypes>(points[0])

  const onSubmit = () => {}

  return (
    <Layout canGoBack title={'포인트 충전'} seoTitle={'포인트 충전'}>
      <div className='mt-10 px-2'>
        <RadioPicker data={points} selectedRadio={selectedPoint} setSelectedRadio={setSelectedPoint} />
        <Button type={'submit'} text={'충전하기'} onClick={onSubmit} />
      </div>
    </Layout>
  )
}

export default PointCharge
