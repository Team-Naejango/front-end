import React from 'react'

import { TransactionResult } from '@/app/apis/types/domain/chat/deal'
import { cls } from '@/app/libs/client/utils/util'

const ItemLIst = ({
  items,
  onClick,
  onDelete,
}: {
  items: TransactionResult[] | undefined
  onClick: (item: TransactionResult) => void
  onDelete: (transactionId: number) => void
}) => {
  return (
    <ul className='flex flex-col p-0.5'>
      <span className={'mb-2 mr-1 flex justify-end text-[13px]'}>{items?.length} 건</span>
      <ul className={'relative flex flex-col gap-4 p-0.5'}>
        {items?.map(item => {
          return (
            <li
              role={'presentation'}
              key={`${item.date}_${item.itemId}_${item.traderId}`}
              className='relative flex cursor-pointer items-center rounded-xl border p-4 hover:border-[#32D7A0]'
              onClick={() => onClick(item)}>
              <div className={'h-16 w-16 rounded-md bg-gray-500'} />
              <div className={'ml-4 flex w-9/12 flex-col gap-0.5'}>
                <span className={'text-xs'}>
                  <span
                    className={cls(
                      'mr-1.5 rounded px-1 py-1 text-[10px] text-white',
                      item.status === '구매' ? 'bg-[#30BD81] !px-1.5' : 'bg-[#A3D139]'
                    )}>
                    {item.status}
                  </span>
                  {item.traderName}
                </span>
                <p className={'overflow-hidden overflow-ellipsis whitespace-nowrap text-[13px] font-semibold'}>
                  {item.itemName}
                </p>
                <span className={'text-xs'}>{new Date(item.date).toLocaleDateString()}</span>
              </div>
              <button
                onClick={event => {
                  event.preventDefault()
                  event.stopPropagation()

                  onDelete(item.id)
                }}
                className='absolute right-2 top-2 z-30'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                  stroke='currentColor'
                  className='h-4 w-4'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </li>
          )
        })}
      </ul>
    </ul>
  )
}

export default ItemLIst
