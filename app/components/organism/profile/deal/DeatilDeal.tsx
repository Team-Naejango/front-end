import React from 'react'

import { TransactionResult } from '@/app/apis/types/domain/chat/deal'

const DetailDeal = ({ deal }: { deal: TransactionResult | undefined }) => {
  return (
    <div
      key={`${deal?.date}_${deal?.itemId}_${deal?.traderId}`}
      className={'flex flex-col items-center justify-center gap-2'}>
      <span className={'text-sm'}>아이템명: {deal?.itemName}</span>
      <span className={'text-sm'}>거래 상대 : {deal?.traderName}</span>
      <span className={'text-sm'}>거래 날짜 : {new Date(deal?.date as string).toLocaleDateString()}</span>
      <span className={'text-sm'}>거래 상태 : {deal?.progress}</span>
      <span className={'text-sm'}>거래 금액 : {deal?.amount}</span>
    </div>
  )
}

export default DetailDeal
