'use client'

import React from 'react'
import Image from 'next/image'

import { cls } from '@/app/libs/client/utils/util'

interface MessageProps {
  message: string
  reverse: boolean
  imgUrl: string | undefined
}

const Message = ({ message, imgUrl, reverse }: MessageProps) => {
  return (
    <div className={cls('flex items-end space-x-2', reverse ? 'flex-row-reverse !space-x-reverse' : '')}>
      {imgUrl === undefined ? (
        <Image
          src={'https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/assets/face2%402x.png'}
          priority
          width={'100'}
          height={'100'}
          quality={100}
          alt='프로필 이미지'
          className={cls('h-10 w-10 rounded-full bg-slate-400 object-cover')}
        />
      ) : (
        <Image
          src={`https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/upload/profile/${encodeURIComponent(
            imgUrl as string
          )}`}
          priority
          width={'100'}
          height={'100'}
          quality={100}
          alt='프로필 이미지'
          className={cls('h-10 w-10 rounded-full bg-slate-400 object-cover')}
        />
      )}
      <div
        className={cls(
          'w-1/2 rounded-md border p-2 text-sm text-gray-700',
          reverse ? 'border-[#33CC99] bg-[#33CC99] text-white' : 'border-gray-300'
        )}>
        <p>{message}</p>
      </div>
      <span className={'text-[10px]'}>{`${new Date().getHours()}:${new Date().getMinutes()}`}</span>
    </div>
  )
}

export default Message
