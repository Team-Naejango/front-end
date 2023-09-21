'use client'

import React from 'react'
import Image from 'next/image'

import { cls } from '@/app/libs/client/utils/util'

interface MessageProps {
  message: string
  reversed?: boolean
  avatarUrl: string
}

const Message = ({ message, avatarUrl, reversed }: MessageProps) => {
  return (
    <div className={cls('flex items-center space-x-2', reversed ? 'flex-row-reverse !space-x-reverse' : '')}>
      <Image
        src={`https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/upload/profile/${encodeURIComponent(
          avatarUrl as string
        )}`}
        priority
        width={'100'}
        height={'100'}
        quality={100}
        alt='프로필 이미지'
        className={cls('h-10 w-10 rounded-full bg-slate-400 object-cover')}
      />

      {/* todo: 퍼널 개발 */}
      <div
        className={cls(
          'w-1/2 rounded-md border p-2 text-sm text-gray-700',
          reversed ? 'border-[#33CC99] bg-[#33CC99] text-white' : 'border-gray-300'
        )}>
        <p>{message}</p>
      </div>
      <span className={'text-[11px]'}>13:40</span>
    </div>
  )
}

export default Message
