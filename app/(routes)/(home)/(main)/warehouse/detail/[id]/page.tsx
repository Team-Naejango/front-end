'use client'

import React, { useLayoutEffect, useState } from 'react'
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
  const [selectedTab, setSelectedTab] = useState<'BUY' | 'SELL'>('BUY')

  // 창고 아이템 조회
  const { data: { data: _itemInfo } = {} } = useQuery(
    [ITEM.조회, params.id],
    () =>
      storageItem({
        storageId: params.id,
        status: true,
        page: '0',
        size: '10',
      }),
    {
      enabled: !!params.id,
    }
  )

  console.log('params.id:', params.id)
  console.log('_itemInfo:', _itemInfo)

  // todo: 삭제 팝업창과 delete api 추가
  const onDeleteProduct = () => {}

  const filteredItemList = (_itemInfo && _itemInfo.itemList.filter(item => item.type === selectedTab)) || [
    { id: 3, category: '가구', itemId: 3, type: 'SELL', imgUrl: '', name: 'ㅅㄷㄴㅅ' },
  ]

  // console.log('selectedTab:', selectedTab)
  console.log('filteredItemList:', filteredItemList)

  const onSelectedTab = () => {
    setSelectedTab(currentTab => (currentTab === 'BUY' ? 'SELL' : 'BUY'))
  }

  return (
    <Layout canGoBack title={`창고${params.id}`}>
      <div className='mt-8'>
        <RoundedTab selectedTab={selectedTab} setSelectedTab={onSelectedTab}>
          <Tab.Panel className={cls('rounded-xl bg-white pb-5 pt-2')}>
            <ul className={'flex flex-col gap-5 p-0.5'}>
              {filteredItemList && filteredItemList.length === 0 ? (
                <div className={'flex h-[450px] items-center justify-center'}>
                  <p className={'text-sm'}>존재하는 아이템이 없습니다.</p>
                </div>
              ) : (
                filteredItemList &&
                filteredItemList.map(item => {
                  return (
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
                        <span className={'text-xs'}>{item.category}</span>
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
                            seq: item.itemId,
                          },
                        }}
                        className={cls(
                          'absolute inset-0 rounded-xl',
                          'ring-[#32D7A0] focus:z-10 focus:outline-none focus:ring-1'
                        )}
                      />
                    </li>
                  )
                })
              )}
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
