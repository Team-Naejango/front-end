import React from 'react'
import Link from 'next/link'

import { cls } from '@/app/libs/client/utils/util'
import { TransactionResult } from '@/app/apis/types/domain/chat/deal'

const ItemLIst = ({
  items,
  onClick,
  onDelete,
}: {
  items: TransactionResult[]
  onClick: () => void
  onDelete: () => void
}) => {
  return (
    <div className={'py-4 pt-2'}>
      <span className={'mr-1 flex justify-end text-[13px]'}>{items.length} 건</span>
      <ul className={'flex flex-col gap-5 p-0.5'}>
        {items.map(post => {
          return (
            <li
              role={'presentation'}
              key={post.itemId}
              className='relative flex items-center justify-around gap-8 rounded-xl border border-[#ECECEC] p-4 hover:border-[#33cc99]/30'
              onClick={onClick}>
              <div className={'h-16 w-16 rounded-md bg-gray-500'} />
              <div className={'-ml-4 flex w-1/2 flex-col gap-0.5'}>
                <span className={'text-xs'}>{post.traderName}</span>
                <p className={'text-[13px] font-semibold'}>{post.itemName}</p>
              </div>
              <Link
                href={'/profile/review'}
                className={cls(
                  'absolute inset-0 rounded-xl',
                  'ring-[#32D7A0] focus:z-10 focus:outline-none focus:ring-1'
                )}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ItemLIst
