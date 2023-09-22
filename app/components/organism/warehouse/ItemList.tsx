import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { cls } from '@/app/libs/client/utils/util'
import { CRUD } from '@/app/libs/client/constants/code'
import { Item } from '@/app/apis/types/domain/warehouse/warehouse'

const ItemLIst = ({
  items,
  params,
  onDelete,
}: {
  items: Item[]
  params: { storageId: string; count: string }
  onDelete: () => void
}) => {
  return (
    <ul className='flex flex-col gap-5 p-0.5'>
      {items.map(item => (
        <li
          key={item.name}
          className='relative flex items-center justify-around rounded-xl border border-[#ECECEC] p-4 hover:border-[#33cc99]/30'>
          <Image
            width={'100'}
            src={`https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/upload/item/${encodeURIComponent(
              item.imgUrl
            )}`}
            height={'100'}
            alt='아이템 이미지'
            className='-ml-4 h-16 w-16 rounded-md object-cover'
          />
          <div className='-ml-6 flex w-1/2 flex-col gap-0.5'>
            <span className='text-xs'>{item.category}</span>
            <p className='text-[13px] font-semibold'>{item.name}</p>
          </div>
          <span role='presentation' onClick={onDelete} className='absolute right-2 top-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='currentColor'
              className='h-4 w-4'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </span>
          <Link
            href={{
              pathname: '/warehouse/detail/item/edit',
              query: {
                crud: CRUD.수정,
                storage: params.storageId,
                item: item.itemId,
                count: params.count,
              },
            }}
            className={cls('absolute inset-0 rounded-xl', 'ring-[#32D7A0] focus:z-10 focus:outline-none focus:ring-1')}
          />
        </li>
      ))}
    </ul>
  )
}

export default ItemLIst
