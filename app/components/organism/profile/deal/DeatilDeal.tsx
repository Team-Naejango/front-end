import React from 'react'

import { TransactionResult } from '@/app/apis/types/domain/chat/deal'

const DetailDeal = ({ deal }: { deal: TransactionResult | undefined }) => {
  return (
    <div
      key={`${deal?.date}_${deal?.itemId}_${deal?.traderId}`}
      className={'flex flex-col items-center justify-center gap-2'}>
      <span className={'text-sm'}>아이템 {deal?.itemName}</span>
      <span className={'text-sm'}>거래상대 {deal?.traderName}</span>
      <span className={'text-sm'}>거래날짜 {deal?.date}</span>
      <span className={'text-sm'}>거래상태 {deal?.progress}</span>
      <span className={'text-sm'}>거래금액 {deal?.amount}</span>
    </div>
  )
}

export default DetailDeal
