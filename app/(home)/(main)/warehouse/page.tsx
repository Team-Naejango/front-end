'use client'

import React, { useState } from 'react'
import Link from 'next/link'

import Layout from '@/app/components/organism/layout/Layout'
import WareHouseCarousel from '@/app/components/organism/warehouse/WareHouseCarousel'
import FloatingButton from '@/app/components/atom/FloatingButton'

const WareHouse = () => {
  return (
    <Layout hasHeader seoTitle={'창고공간'}>
      <div className={'relative h-full w-full'}>
        <div className='flex flex-col justify-center'>
          <WareHouseCarousel />
          <h2 className={'mb-4 mt-16 text-center text-lg font-bold'}>창고 정보</h2>
          <div className={'h-auto w-full rounded-xl bg-[#f5f5f5] px-8 py-4 text-center'}>
            <div className='mx-auto my-4 grid grid-cols-1 grid-rows-[minmax(0,1fr)] items-center justify-center gap-x-3 gap-y-8'>
              <div className={'flex w-full items-center gap-12 text-left'}>
                <ul className={'flex-1'}>
                  <li className={'text-xs'}>이름</li>
                  <li className={'mt-1 text-[13px] font-medium'}>내 잔고는 특별해</li>
                </ul>
                <ul className={'flex-1'}>
                  <li className={'text-xs'}>위치</li>
                  <li className={'mt-1 text-[13px] font-medium'}>대충 어딘가</li>
                </ul>
              </div>
              <div className={'flex w-full items-center gap-14 text-left'}>
                <ul className={'flex-1'}>
                  <li className={'text-xs'}>생성일</li>
                  <li className={'mt-1 text-[13px] font-medium'}>2023/04/19</li>
                </ul>
                <ul className={'flex-1'}>
                  <li className={'text-xs'}>소개</li>
                  <li className={'mt-1 text-[13px] font-medium'}>가나다라마바사아자</li>
                </ul>
              </div>
            </div>
          </div>
          <FloatingButton href='/warehouse/item/create'>
            <span className={'text-xs'}>창고등록</span>
          </FloatingButton>
        </div>
        <div className={'absolute right-0 top-3 rounded border border-[#ddd] px-1.5 py-1 hover:border-[#32D7A0]'}>
          <Link href={'/warehouse/point'}>
            <span className={'inline-block text-[13px]'}>포인트 충전</span>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default WareHouse
