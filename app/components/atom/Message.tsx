'use client'

import React from 'react'
import Image from 'next/image'

import { cls } from '@/app/libs/client/utils/util'
import { ChatResponse } from '@/app/(routes)/(home)/(main)/chats/edit/page'
import { MESSAGE_TYPE } from '@/app/libs/client/constants/code'

interface MessageProps {
  data: ChatResponse
  isMe: boolean
  imgUrl: string | undefined
}

const Message = ({ data, isMe, imgUrl }: MessageProps) => {
  return data.messageType === MESSAGE_TYPE.구독 ? (
    <div className={'text-center'}>
      <p className={'text-xs'}>{data.content}</p>
    </div>
  ) : (
    <div className={cls('flex items-end space-x-2', isMe ? 'flex-row-reverse !space-x-reverse' : '')}>
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
          isMe ? 'border-[#33CC99] bg-[#33CC99] text-white' : 'border-gray-300'
        )}>
        <p>{data.content}</p>
      </div>
      <span className={'text-[10px]'}>{new Date(data.sentAt).toLocaleTimeString()}</span>
    </div>
  )
}

export default Message
