'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { Tab } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'

import Layout from '@/app/components/template/main/layout/Layout'
import RoundedTab from '@/app/components/molecule/tab/RoundedTab'
import FloatingButton from '@/app/components/atom/FloatingButton'
import ItemList from '@/app/components/organism/warehouse/ItemList'
import { CRUD } from '@/app/libs/client/constants/code'
import { ITEM } from '@/app/libs/client/reactQuery/queryKey/warehouse'

import { storageItem } from '@/app/apis/domain/warehouse/warehouse'

const WareHouseItem = () => {
  const params = useParams()
  const [selectedTab, setSelectedTab] = useState<('INDIVIDUAL_BUY' | 'GROUP_BUY') | 'INDIVIDUAL_SELL'>('INDIVIDUAL_BUY')

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
  const filteredItemList = (_itemInfo && _itemInfo.result.filter(item => item.itemType === selectedTab)) || []

  const onSelectedTab = (tab: string) => {
    if (tab === selectedTab) return
    setSelectedTab(currentTab =>
      currentTab === ('INDIVIDUAL_BUY' || 'GROUP_BUY') ? 'INDIVIDUAL_SELL' : 'INDIVIDUAL_BUY' || 'GROUP_BUY'
    )
  }

  // todo: 삭제 팝업창과 delete api 추가
  const onDeleteProduct = () => {}

  return (
    <Layout canGoBack title={`창고${params.id}`}>
      <div className='mt-8'>
        <RoundedTab setSelectedTab={onSelectedTab}>
          <Tab.Panel>
            {selectedTab === ('INDIVIDUAL_BUY' || 'GROUP_BUY') &&
              (filteredItemList.length === 0 ? (
                <div className='flex h-[450px] items-center justify-center'>
                  <p className='text-sm'>존재하는 아이템이 없습니다.</p>
                </div>
              ) : (
                <ItemList items={filteredItemList} onDeleteProduct={onDeleteProduct} params={params} />
              ))}
          </Tab.Panel>
          <Tab.Panel>
            {selectedTab === 'INDIVIDUAL_SELL' &&
              (filteredItemList.length === 0 ? (
                <div className='flex h-[450px] items-center justify-center'>
                  <p className='text-sm'>존재하는 아이템이 없습니다.</p>
                </div>
              ) : (
                <ItemList items={filteredItemList} onDeleteProduct={onDeleteProduct} params={params} />
              ))}
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
