'use client'

import React from 'react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'

import { cls } from '@/app/libs/client/utils/util'
import { ITEM } from '@/app/libs/client/reactQuery/queryKey/warehouse'
import { ChannelInfo, ItemMatchResult } from '@/app/apis/types/domain/warehouse/warehouse'

import { itemMatch } from '@/app/apis/domain/warehouse/warehouse'

const ItemMatch = ({
  itemId,
  groupChatInfo,
  onSelect,
}: {
  itemId: string
  groupChatInfo: ChannelInfo
  onSelect: (item: ItemMatchResult) => void
}) => {
  // 아이템 매칭
  const { data: { data: items } = {} } = useQuery(
    [ITEM.매칭],
    () =>
      itemMatch({
        rad: '1000',
        size: '10',
        itemId,
      }),
    {
      enabled: !!itemId,
    }
  )

  return (
    <div
      className={cls(
        'fixed left-1/2 top-8 w-10/12 -translate-x-1/2 overflow-y-auto rounded-xl border border-[#ececec]',
        !items?.result || (items?.result.length || 0) <= 2 ? 'h-auto' : 'h-[300px]'
      )}>
      <div className='h-inherit mx-auto flex flex-col gap-4 bg-[#F3F4F6] p-4'>
        <p className={'text-center text-sm'}>매칭 아이템</p>
        {items?.result.length === 0 ? (
          <div className={'flex h-[230px] items-center justify-center rounded border bg-white'}>
            <p className={'text-xs'}>매칭된 아이템이 없습니다.</p>
          </div>
        ) : (
          items?.result.map(item => {
            return (
              <div
                role={'presentation'}
                key={item.itemId}
                className='flex h-16 cursor-auto items-center justify-start overflow-hidden rounded-lg border border-gray-300 bg-white'
                onClick={() => onSelect(item)}>
                <div className='relative h-16 w-16 flex-shrink-0'>
                  <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center'>
                    <Image
                      src={'https://stackdiary.com/140x100.png'}
                      width={'100'}
                      height={'100'}
                      alt={'아이템 이미지'}
                      loading={'lazy'}
                      className={
                        'duration-50 absolute left-0 top-0 h-full w-full object-cover object-center transition'
                      }
                    />
                  </div>
                </div>
                <div className='relative flex h-16 w-full flex-col justify-center py-1 pl-4'>
                  <p className='w-40 overflow-hidden overflow-ellipsis whitespace-nowrap text-sm'>{item.name}</p>
                  <span className='mt-1 w-40 text-xs text-gray-500'>
                    {(groupChatInfo?.participantsCount || 0) / (groupChatInfo?.channelLimit || 0)}
                  </span>
                  <span className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10'>
                    <span
                      className={
                        groupChatInfo?.participantsCount === groupChatInfo?.channelLimit
                          ? 'text-red-500'
                          : 'text-green-400'
                      }>
                      <svg
                        viewBox='0 0 20 20'
                        className='mr-0.5 inline-block'
                        height='1em'
                        width='1em'
                        xmlns='http://www.w3.org/2000/svg'>
                        <circle cx='8' cy='8' r='6' fill='currentColor' />
                        <path fill='currentColor' fillRule='evenodd' clipRule='evenodd' />
                      </svg>
                    </span>
                    입장
                  </span>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default ItemMatch
