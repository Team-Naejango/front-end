'use client'

import React, { useState } from 'react'
import { Tab } from '@headlessui/react'

import RoundedTab from '@/app/components/molecule/tab/RoundedTab'
import ItemList from '@/app/components/organism/profile/review/ItemList'
import { ITEM_TYPE } from '@/app/libs/client/constants/code'
import { Transaction } from '@/app/apis/types/domain/chat/deal'

/**
 * todo: 작업 보류
 *
 * */
const ReviewCard = () => {
  const [selectedTab, setSelectedTab] = useState<string | string[]>([ITEM_TYPE.개인구매, ITEM_TYPE.공동구매])
  const [reviews] = useState<Transaction>({
    message: '',
    result: [
      {
        id: 1,
        date: '2023-07-15T17:35',
        amount: 1000,
        status: '구매',
        progress: '거래 완료',
        traderId: 1,
        traderName: '거래자 이름1',
        itemId: 1,
        itemName: '아이템 이름1',
      },
    ],
  }) // 더미 데이터

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

  return (
    <RoundedTab setSelectedTab={onSelectedTab}>
      <Tab.Panel>
        {selectedTab.includes(ITEM_TYPE.개인구매 || ITEM_TYPE.공동구매) &&
          (reviews.result.length === 0 ? (
            <div className='flex h-[450px] items-center justify-center'>
              <p className='text-sm'>등록가능한 리뷰내역이 없습니다.</p>
            </div>
          ) : (
            <ItemList items={reviews.result} onClick={() => {}} onDelete={() => {}} />
          ))}
      </Tab.Panel>
      <Tab.Panel>
        {selectedTab.includes(ITEM_TYPE.개인판매) &&
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
