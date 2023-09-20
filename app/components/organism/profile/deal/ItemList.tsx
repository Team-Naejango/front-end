import React from 'react'

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
    <ul className='flex flex-col gap-5 p-0.5'>
      <span className={'mr-1 flex justify-end text-[13px]'}>{items.length} 건</span>
      <ul className={'flex flex-col p-0.5'}>
        {items.map(post => {
          return (
            <li
              role={'presentation'}
              key={post.itemId}
              className='relative flex cursor-pointer items-center rounded-xl p-4'
              onClick={onClick}>
              <div className={'h-16 w-16 rounded-md bg-gray-500'} />
              <div className={'ml-4 flex w-9/12 flex-col gap-0.5'}>
                <span className={'text-xs'}>
                  {/* <span */}
                  {/*  className={cls( */}
                  {/*    'mr-1.5 rounded px-1 py-1 text-[10px] text-white', */}
                  {/*    post.swap === 'BUY' ? 'bg-[#30BD81] !px-1.5' : 'bg-[#A3D139]' */}
                  {/*  )}> */}
                  {/*  {post.swap} */}
                  {/* </span> */}
                  {post.traderName}
                </span>
                <p className={'overflow-hidden overflow-ellipsis whitespace-nowrap text-[13px] font-semibold'}>
                  {post.itemName}
                </p>
                <span className={'text-xs'}>날짜</span>
              </div>
            </li>
          )
        })}
      </ul>
    </ul>
  )
}

export default ItemLIst
