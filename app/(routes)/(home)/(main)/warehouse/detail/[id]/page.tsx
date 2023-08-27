'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { Tab } from '@headlessui/react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

import Layout from '@/app/components/template/main/layout/Layout'
import RoundedTab from '@/app/components/molecule/tab/RoundedTab'
import FloatingButton from '@/app/components/atom/FloatingButton'
import { cls } from '@/app/libs/client/utils/util'
import { CRUD } from '@/app/libs/client/constants/code'
import { ITEM } from '@/app/libs/client/reactQuery/queryKey/warehouse'

import { storageItem } from '@/app/apis/domain/warehouse/warehouse'

const WareHouseItem = () => {
  const params = useParams()

  const [categories] = useState({
    BUY: [
      {
        id: 1,
        value: '식품',
        title: '모던리빙 호텔 수건 180g 코마사 40수 세트',
      },
      {
        id: 2,
        value: '식품',
        title: '비비안 고양이 패턴 남성 파자마 잠옷 세트',
      },
      {
        id: 3,
        value: '식품',
        title: '삼다수 무라벨 2L 6개',
      },
      {
        id: 4,
        value: '식품',
        title: '모던리빙 호텔 수건 180g 코마사 40수 세트',
      },
      {
        id: 5,
        value: '식품',
        title: '삼다수 무라벨 2L 6개',
      },
    ],
    SELL: [
      {
        id: 1,
        value: '식품',
        title: '비비안 고양이 패턴 남성 파자마 잠옷 세트',
      },
      {
        id: 2,
        value: '식품',
        title: '모던리빙 호텔 수건 180g 코마사 40수 세트',
      },
    ],
  })

  // 창고 아이템 조회
  const { data: { data: _itemInfo } = {} } = useQuery(
    [ITEM.조회, params.id],
    () =>
      storageItem({
        storageId: params.id,
        status: true,
        page: '1',
        size: '1',
      }),
    {
      enabled: !!params.id,
    }
  )

  console.log('params.id:', params.id)
  console.log('_itemInfo:', _itemInfo)

  // todo: 삭제 팝업창과 delete api 추가
  const onDeleteProduct = () => {}

  return (
    <Layout canGoBack title={'창고'}>
      <div className='mt-8'>
        <RoundedTab tabs={categories as any}>
          <Tab.Panel className={cls('rounded-xl bg-white pb-5 pt-2')}>
            <ul className={'flex flex-col gap-5 p-0.5'}>
              {_itemInfo?.itemList.map(item => (
                <li
                  key={item.name}
                  className='relative flex items-center justify-around rounded-xl border border-[#ECECEC] p-4 hover:border-[#33cc99]/30'>
                  <Image
                    width={'100'}
                    src={`https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/upload/item/${encodeURIComponent(
                      item.imgUrl
                    )}`}
                    height={'100'}
                    alt='아이템 이미지'
                    className={'-ml-4 h-16 w-16 rounded-md object-cover'}
                  />
                  <div className={'-ml-6 flex w-1/2 flex-col gap-0.5'}>
                    <span className={'text-xs'}>{item.category.name}</span>
                    <p className={'text-[13px] font-semibold'}>{item.name}</p>
                  </div>
                  <span role='presentation' onClick={onDeleteProduct} className={'absolute right-2 top-2'}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='2'
                      stroke='currentColor'
                      className='h-4 w-4'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                    </svg>
                  </span>
                  <Link
                    href={{
                      pathname: '/warehouse/detail/item/edit',
                      query: {
                        crud: CRUD.수정,
                        storage: params.id,
                        seq: 1,
                      },
                    }}
                    className={cls(
                      'absolute inset-0 rounded-xl',
                      'ring-[#32D7A0] focus:z-10 focus:outline-none focus:ring-1'
                    )}
                  />
                </li>
              ))}
            </ul>
          </Tab.Panel>
        </RoundedTab>
        <FloatingButton
          href={{
            pathname: '/warehouse/detail/item/edit',
            query: {
              crud: CRUD.등록,
              storage: params.id,
              seq: null,
            },
          }}>
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
