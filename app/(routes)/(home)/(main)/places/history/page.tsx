'use client'

import React from 'react'
import uuid from 'react-uuid'
import { CiSearch } from 'react-icons/ci'
import { toast } from 'react-hot-toast'

import Layout from '@/app/components/template/main/layout/Layout'
import InputField from '@/app/components/atom/InputField'

const History = () => {
  const dummyData = ['키워드1', '키워드12323', '키워드151', '키워드145', '키워드733', '키워드12323']

  const onClickSearch = () => {
    toast.error('개발중')
  }

  return (
    <Layout canGoBack title={'창고검색'} seoTitle={'창고검색'}>
      <div className='mt-12'>
        <InputField
          type={'text'}
          placeholder={'검색'}
          className={'!left-12 !m-auto !rounded-[10px] !px-0 placeholder:text-sm placeholder:text-gray-300'}
          icon={
            <CiSearch
              onClick={onClickSearch}
              className='absolute right-2 mx-2 cursor-pointer text-2xl text-[#A9A9A9]'
            />
          }
        />
        <div className={'mt-6 flex flex-wrap gap-5'}>
          {dummyData.map(keyword => {
            return (
              <span key={`${uuid()}_${keyword}`} className={'cursor-pointer rounded-2xl bg-gray-200 px-4 py-1 text-xs'}>
                {keyword}
              </span>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default History
