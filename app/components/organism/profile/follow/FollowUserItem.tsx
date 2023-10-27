'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'

import { cls } from '@/app/libs/client/utils/util'
import { E_ITEM_TYPE, ITEM_TYPE } from '@/app/libs/client/constants/code'
import { ItemType } from '@/app/apis/types/domain/profile/follow'
import { WishResult } from '@/app/apis/types/domain/profile/wish'

const FollowUserItem = ({
  items,
  wishs,
  onWish,
}: {
  items: ItemType[]
  wishs: WishResult[]
  onWish: (itemId: number) => void
}) => {
  const currentItemRef = useRef<HTMLDivElement | null>(null)

  // 아이템 타입 변환기
  const convertedItemTypeNm = (type: E_ITEM_TYPE) => {
    let itemTypeNm: string = ''

    if (type === ITEM_TYPE.개인구매) {
      itemTypeNm = '개인구매'
    } else if (type === ITEM_TYPE.개인판매) {
      itemTypeNm = '개인판매'
    } else if (type === ITEM_TYPE.공동구매) {
      itemTypeNm = '공동구매'
    }

    return itemTypeNm
  }

  useEffect(() => {
    return () => {
      currentItemRef.current = null
    }
  }, [])

  return (
    <div className='grid grid-cols-2 grid-rows-[minmax(0,1fr)] justify-items-center gap-4 py-4'>
      {items ? (
        items.map(item => {
          return (
            <div key={item.itemId} role={'presentation'} ref={currentItemRef} className={'relative'}>
              <Image
                width={'100'}
                src={`https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/upload/item/${encodeURIComponent(
                  item.imgUrl
                )}`}
                height={'100'}
                alt='아이템 이미지'
                className={'h-28 w-28 cursor-pointer rounded-md border border-[#ddd] object-cover'}
              />
              <span
                role={'presentation'}
                className={'absolute right-1 top-1 z-10 cursor-pointer text-[#33CC99]'}
                onClick={() => onWish(item.itemId)}>
                <svg
                  className='h-5 w-5'
                  fill={wishs?.some(v => v.id === item?.itemId) ? '#33CC99' : 'none'}
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  />
                </svg>
              </span>

              {/* hover */}
              <div className='absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-md bg-black bg-opacity-50 opacity-0 transition-opacity hover:opacity-100'>
                <div className={'flex h-full flex-col items-center justify-center gap-0.5 text-center'}>
                  <span
                    className={cls(
                      'rounded px-1 py-1 text-[10px] text-white',
                      item.itemType === ITEM_TYPE.개인판매 ? 'bg-[#A3D139]' : 'bg-[#30BD81] !px-1.5'
                    )}>
                    {convertedItemTypeNm(item.itemType)}
                  </span>
                  <span className={'text-xs text-white'}>{item.name}</span>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <div className={'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'}>
          <p className={'text-[15px]'}>팔로우 목록이 없습니다.</p>
        </div>
      )}
    </div>
  )
}

export default FollowUserItem
