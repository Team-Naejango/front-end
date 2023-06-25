'use client'

import React from 'react'
import { CiSearch } from 'react-icons/ci'

import InputField from '@/app/components/atom/InputField'

const SearchProduct = () => {
  const dummyData = ['키워드1', '키워드12323', '키워드151', '키워드145', '키워드733', '키워드12323']

  const onClickSearch = () => {
    alert('개발중')
  }

  return (
    <div className='mt-12'>
      <div className={'flex items-center justify-center'}>
        <InputField
          type={'text'}
          placeholder={'검색'}
          className={'!rounded-[10px] placeholder:text-sm placeholder:text-gray-300'}
        />
        <CiSearch onClick={onClickSearch} className='!mx-3 cursor-pointer text-3xl text-[#222]' />
      </div>
      <div className={'mt-6 flex flex-wrap gap-5'}>
        {dummyData.map((keyword, index) => {
          return (
            <span
              key={`${keyword[index]}_${keyword}`}
              className={'cursor-pointer rounded-2xl bg-gray-200 px-4 py-1 text-sm'}>
              {keyword}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default SearchProduct
