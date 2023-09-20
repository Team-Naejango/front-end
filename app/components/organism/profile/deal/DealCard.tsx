'use client'

import React, { useState } from 'react'
import { Tab } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'

import RoundedTab from '@/app/components/molecule/tab/RoundedTab'
import { DEAL } from '@/app/libs/client/reactQuery/queryKey/chat'
import { ITEM_TYPE } from '@/app/libs/client/constants/code'
import ItemList from '@/app/components/organism/profile/deal/ItemList'

import { deal } from '@/app/apis/domain/chat/deal'

const DealCard = ({ onClick }: { onClick: () => void }) => {
  const [selectedTab, setSelectedTab] = useState<string | string[]>(ITEM_TYPE.개인구매)

  // 거래 조회
  const { data: { data: deals } = {} } = useQuery([DEAL.조회], () => deal())
  const filteredDealList = deals?.result.filter(item => item.status === selectedTab) || []

  // 탭 선택
  const onSelectedTab = (tab: string[] | string) => {
    if (String(tab) === selectedTab) return

    setSelectedTab(currentTab => {
      if (currentTab === ITEM_TYPE.개인구매 || currentTab === ITEM_TYPE.공동구매) {
        return ITEM_TYPE.개인판매
      }
      return ITEM_TYPE.개인구매 || ITEM_TYPE.공동구매
    })
  }

  // todo: 삭제 팝업창과 delete api 추가
  const onDeleteHistory = () => {}

  return (
    <RoundedTab setSelectedTab={onSelectedTab}>
      <Tab.Panel>
        {selectedTab === (ITEM_TYPE.개인구매 || ITEM_TYPE.공동구매) &&
          (filteredDealList.length === 0 ? (
            <div className='flex h-[450px] items-center justify-center'>
              <p className='text-sm'>존재하는 거래내역이 없습니다.</p>
            </div>
          ) : (
            <ItemList items={filteredDealList} onClick={onClick} onDelete={onDeleteHistory} />
          ))}
      </Tab.Panel>
      <Tab.Panel>
        {selectedTab === ITEM_TYPE.개인판매 &&
          (filteredDealList.length === 0 ? (
            <div className='flex h-[450px] items-center justify-center'>
              <p className='text-sm'>존재하는 거래내역이 없습니다.</p>
            </div>
          ) : (
            <ItemList items={filteredDealList} onClick={onClick} onDelete={onDeleteHistory} />
          ))}
      </Tab.Panel>
    </RoundedTab>
  )
}

export default DealCard
