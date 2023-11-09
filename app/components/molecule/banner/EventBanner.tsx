'use client'

import React from 'react'
import Image from 'next/image'

import { HOMEIMAGES } from '@/app/libs/client/constants/static'
import { cls } from '@/app/libs/client/utils/util'

const EventBanner = () => {
  return (
    <div className={'flex h-[100%] flex-col items-center justify-center space-y-6'}>
      {HOMEIMAGES.map(value => {
        return (
          <div key={value.id} className={'relative h-[230px] w-full cursor-pointer'}>
            <Image
              src={value.src}
              priority
              quality={100}
              placeholder='blur'
              blurDataURL={value.blurUrl}
              alt={'이벤트 이미지'}
              style={{
                height: 'inherit',
                objectFit: 'cover',
              }}
              className={'bg-top'}
            />
            <span
              className={cls(
                'absolute left-[10px] top-[9px] rounded border p-0.5 text-xs text-white',
                value.ing ? 'border-white bg-transparent' : 'border-black bg-black/60'
              )}>
              {value.ing ? '진행중' : '진행종료'}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default EventBanner
