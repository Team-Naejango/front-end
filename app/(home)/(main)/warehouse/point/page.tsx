'use client'

import React, { useState } from 'react'

import Layout from '@/app/components/template/main/layout/Layout'
import Button from '@/app/components/atom/Button'
import RadioPicker, { DataTypes } from '@/app/components/molecule/tab/RadioPicker'

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
        <div className={'fixed bottom-[95px] left-1/2 w-[90%] -translate-x-1/2 transform'}>
          <Button type={'submit'} text={'충전하기'} onClick={onSubmit} />
        </div>
      </div>
    </Layout>
  )
}

export default PointCharge
