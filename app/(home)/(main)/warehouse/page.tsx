'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { LuEdit2 } from 'react-icons/lu'

import Layout from '@/app/components/template/main/layout/Layout'
import WareHouseCarousel from '@/app/components/organism/warehouse/WareHouseCarousel'
import FloatingButton from '@/app/components/atom/FloatingButton'
import useCustomRouter from '@/app/hooks/useCustomRouter'
import { CRUD } from '@/app/libs/client/constants/code'
import { WAREHOUSE } from '@/app/libs/client/reactQuery/queryKey/warehouse'

import { storage } from '@/app/apis/domain/warehouse/warehouse'

const WareHouse = () => {
  const { push } = useCustomRouter()

  // 창고 조회
  const { data: { data: _storageInfo } = {} } = useQuery([WAREHOUSE.조회], () => storage(), {
    // enabled: !!seq,
  })

  console.log('_storageInfo:', _storageInfo)

  const onCreate = () => {
    const params: { crud: string; seq: null } = {
      crud: CRUD.등록,
      seq: null,
    }
    push({
      pathname: `/warehouse/1`,
      query: params,
    })
  }

  return (
    <Layout hasHeader seoTitle={'창고공간'}>
      <div className={'relative h-full w-full'}>
        <div className='flex flex-col justify-center'>
          <WareHouseCarousel datas={_storageInfo!} onClick={onCreate} />
          <h2 className={'mb-4 mt-16 text-center text-lg font-bold'}>창고 정보</h2>
          <div className={'h-auto w-full rounded-xl bg-[#f5f5f5] px-8 py-4 text-center'}>
            <div className='mx-auto my-4 grid grid-cols-1 grid-rows-[minmax(0,1fr)] items-center justify-center gap-x-3 gap-y-8'>
              <div className={'flex w-full items-center gap-12 text-left'}>
                <ul className={'flex-1'}>
                  <li className={'text-xs'}>이름</li>
                  <li className={'mt-1 text-[13px] font-medium'}>{_storageInfo?.name}</li>
                </ul>
                <ul className={'flex-1'}>
                  <li className={'text-xs'}>위치</li>
                  <li className={'mt-1 text-[13px] font-medium'}>{_storageInfo?.address}</li>
                </ul>
              </div>
              <div className={'flex w-full items-center gap-14 text-left'}>
                <ul className={'flex-1'}>
                  <li className={'text-xs'}>생성일</li>
                  <li className={'mt-1 text-[13px] font-medium'}>2023/04/19</li>
                </ul>
                <ul className={'flex-1'}>
                  <li className={'text-xs'}>소개</li>
                  <li className={'mt-1 text-[13px] font-medium'}>{_storageInfo?.description}</li>
                </ul>
              </div>
            </div>
          </div>
          <FloatingButton
            href={{
              pathname: '/warehouse/1',
              query: {
                crud: CRUD.수정,
                seq: 1,
              },
            }}>
            <span className={'text-xs'}>
              <LuEdit2 fontSize={'21'} />
            </span>
          </FloatingButton>
        </div>
        <div className={'absolute right-0 top-3 rounded border border-[#ccc] px-1.5 py-1 hover:border-[#32D7A0]'}>
          <Link href={'/warehouse/point'}>
            <span className={'inline-block text-[13px]'}>포인트 충전</span>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default WareHouse
