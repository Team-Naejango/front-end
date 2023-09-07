'use client'

import React from 'react'
import Image from 'next/image'

import { cls } from '@/app/libs/client/utils/util'

interface MessageProps {
  message: string
  reversed: boolean
  avatarUrl: string
}

const Message = ({ message, avatarUrl, reversed }: MessageProps) => {
  return (
    <div className={cls('flex items-start', reversed ? 'flex-row-reverse space-x-2 !space-x-reverse' : 'space-x-2')}>
      {/* <div className='h-8 w-8 rounded-full bg-slate-400' /> */}
      <Image
        src={`https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/upload/profile/${encodeURIComponent(
          avatarUrl as string
        )}`}
        priority
        width={'100'}
        height={'100'}
        quality={100}
        alt='프로필 이미지'
        className={cls('h-8 w-8 rounded-full bg-slate-400 object-cover')}
      />

      {/* todo: 퍼널 개발 */}
      <div className='w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700'>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default Message
