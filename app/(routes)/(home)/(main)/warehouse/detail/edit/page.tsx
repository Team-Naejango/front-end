'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Tab } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'

import Layout from '@/app/components/template/main/layout/Layout'
import RoundedTab from '@/app/components/molecule/tab/RoundedTab'
import FloatingButton from '@/app/components/atom/FloatingButton'
import ItemList from '@/app/components/organism/warehouse/ItemList'
import { CRUD, ITEM_TYPE } from '@/app/libs/client/constants/code'
import { ITEM } from '@/app/libs/client/reactQuery/queryKey/warehouse'

import { storageItem } from '@/app/apis/domain/warehouse/warehouse'

const WareHouseItem = () => {
  const searchParams = useSearchParams()
  const [selectedTab, setSelectedTab] = useState<string | string[]>([ITEM_TYPE.개인구매, ITEM_TYPE.공동구매])

  const storageId = searchParams.get('storage')
  const count = searchParams.get('count')

  // 창고 아이템 조회
  const { data: { data: _itemInfo } = {} } = useQuery(
    [ITEM.조회, storageId],
    () =>
      storageItem({
        storageId: String(storageId),
        status: true,
        page: '0',
        size: '10',
      }),
    {
      enabled: !!storageId,
    }
  )

  // 아이템 필터링
  const filteredItemList =
    [...(_itemInfo?.result || [])].filter(item => [...selectedTab].some(tab => tab === item.itemType)) || []

  // 탭 선택
  const onSelectedTab = (tab: string | string[]) => {
    const PERSONAL_OR_GROUP = ITEM_TYPE.개인구매 || ITEM_TYPE.공동구매

    if (tab.includes(PERSONAL_OR_GROUP) === selectedTab.includes(PERSONAL_OR_GROUP)) return

    setSelectedTab(() => {
      if (selectedTab.includes(PERSONAL_OR_GROUP)) {
        return ITEM_TYPE.개인판매
      }
      return [ITEM_TYPE.개인구매, ITEM_TYPE.공동구매]
    })
  }

  // todo: 삭제 팝업창과 delete api 추가
  const onDeleteItem = () => {}

  return (
    <Layout canGoBack title={`창고${Number(count) + 1}`}>
      <div className='mt-8'>
        <RoundedTab setSelectedTab={onSelectedTab}>
          <Tab.Panel>
            {selectedTab.includes(ITEM_TYPE.개인구매 || ITEM_TYPE.공동구매) &&
              (filteredItemList.length === 0 ? (
                <div className='flex h-[450px] items-center justify-center'>
                  <p className='text-sm'>존재하는 아이템이 없습니다.</p>
                </div>
              ) : (
                <ItemList
                  items={filteredItemList}
                  params={{ storageId: String(storageId), count: String(count) }}
                  onDelete={onDeleteItem}
                />
              ))}
          </Tab.Panel>
          <Tab.Panel>
            {selectedTab === ITEM_TYPE.개인판매 &&
              (filteredItemList.length === 0 ? (
                <div className='flex h-[450px] items-center justify-center'>
                  <p className='text-sm'>존재하는 아이템이 없습니다.</p>
                </div>
              ) : (
                <ItemList
                  items={filteredItemList}
                  params={{ storageId: String(storageId), count: String(count) }}
                  onDelete={onDeleteItem}
                />
              ))}
          </Tab.Panel>
        </RoundedTab>
        <FloatingButton
          href={{
            pathname: '/warehouse/detail/item/edit',
            query: {
              crud: CRUD.등록,
              storage: storageId,
              item: null,
              count: count!,
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
