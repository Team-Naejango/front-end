'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { CiSearch } from 'react-icons/ci'

import ItemCard from '@/app/components/organism/product/ItemCard'
import InputField from '@/app/components/atom/InputField'

interface ItemProps {
  title: string
  price: string
}

const Products = () => {
  const router = useRouter()

  const dummyData: ItemProps[] = [
    { title: '삼다수 무라벨 2L 6개', price: '3,980' },
    { title: '5.1Kg (300g소분...', price: '38,900' },
    { title: '삼다수 무라벨 2L 6개', price: '3,480' },
    { title: '5.1Kg (300g소분...', price: '64,300' },
    { title: '모던리빙 호텔 수건 ...', price: '0' },
    { title: '비비안 고양이 패턴 ...', price: '999,999' },
  ]

  const onClickSearch = () => {
    // todo: searchParams 물고 가기
    router.push('/products/search')
  }

  return (
    <div className={'relative h-auto'}>
      <div role={'presentation'} className={'mt-2'} onClick={onClickSearch}>
        <p className={'mb-5 text-center text-sm'}>찾고 있는 물건이 있으신가요?</p>
        <InputField
          type={'text'}
          placeholder={'검색'}
          className={'!left-12 !m-auto !w-64 !rounded-[10px] !px-0 placeholder:text-sm placeholder:text-gray-300'}
          icon={
            <CiSearch
              onClick={onClickSearch}
              className='absolute right-12 mx-2 cursor-pointer text-2xl text-[#A9A9A9]'
            />
          }
        />
      </div>
      <div className='mb-6 mt-6 flex flex-row flex-wrap items-center justify-center'>
        {dummyData.map((data, idx) => {
          return <ItemCard key={`${data.title}/${data.price}`} title={data.title} id={idx} price={data.price} />
        })}
      </div>
    </div>
  )
}

export default Products
