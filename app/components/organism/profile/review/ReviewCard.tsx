'use client'

import React, { useState } from 'react'
import { Tab } from '@headlessui/react'

import RoundedTab from '@/app/components/molecule/tab/RoundedTab'
import ItemList from '@/app/components/organism/profile/review/ItemList'
import { ITEM_TYPE } from '@/app/libs/client/constants/code'

const ReviewCard = () => {
  const [selectedTab, setSelectedTab] = useState<string | string[]>(ITEM_TYPE.개인구매)
  const [reviews] = useState({
    result: [
      {
        id: 1,
        date: '2023-07-15T17:35',
        amount: 1000,
        status: '구매',
        traderName: '거래자 이름1',
        itemName: '아이템 이름1',
        itemId: 1,
      },
    ],
  }) // 더미 데이터

  // 탭 선택
  const onSelectedTab = (tab: string | string[]) => {
    if (String(tab) === selectedTab) return

    setSelectedTab(currentTab => {
      if (currentTab === ITEM_TYPE.개인구매 || currentTab === ITEM_TYPE.공동구매) {
        return ITEM_TYPE.개인판매
      }
      return ITEM_TYPE.개인구매 || ITEM_TYPE.공동구매
    })
  }

  return (
    <RoundedTab setSelectedTab={onSelectedTab}>
      <Tab.Panel>
        {selectedTab === (ITEM_TYPE.개인구매 || ITEM_TYPE.공동구매) &&
          (reviews.result.length === 0 ? (
            <div className='flex h-[450px] items-center justify-center'>
              <p className='text-sm'>등록가능한 리뷰내역이 없습니다.</p>
            </div>
          ) : (
            <ItemList items={reviews.result} onClick={() => {}} onDelete={() => {}} />
          ))}
      </Tab.Panel>
      <Tab.Panel>
        {selectedTab === ITEM_TYPE.개인판매 &&
          (reviews.result.length === 0 ? (
            <div className='flex h-[450px] items-center justify-center'>
              <p className='text-sm'>등록가능한 리뷰내역이 없습니다.</p>
            </div>
          ) : (
            <ItemList items={reviews.result} onClick={() => {}} onDelete={() => {}} />
          ))}
      </Tab.Panel>
    </RoundedTab>
  )
}

export default ReviewCard
