'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import Layout from '@/app/components/template/main/layout/Layout'
import SmallBanner from '@/app/components/molecule/banner/SmallBanner'
import { cls } from '@/app/libs/client/utils/util'
import { CHAT } from '@/app/libs/client/reactQuery/queryKey/chat'

import { chat } from '@/app/apis/domain/chat/chat'

const Chats = () => {
  const router = useRouter()
  const [close, setClose] = useState<boolean>(false)

  // 채팅방 목록
  const { data: { data: chats } = {}, refetch } = useQuery([CHAT.조회], () => chat())
  console.log('chats:', chats)

  const onMoveBanner = () => {
    router.push('/events')
  }

  useEffect(() => {
    refetch()
  }, [])

  return (
    <Layout hasHeader seoTitle={'채팅'}>
      {!close && <SmallBanner onClick={onMoveBanner} onClose={() => setClose(true)} />}
      <div className='mb-14 mt-4 divide-y-[1px]'>
        {chats?.result.length === 0 ? (
          <div className={'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'}>
            <p className={'text-[15px]'}>채팅 목록이 없습니다.</p>
          </div>
        ) : (
          chats?.result.map((chat, idx) => (
            <Link
              href={{
                pathname: `/chats/edit`,
                query: {
                  channel: chat.channelId,
                  type: chat.channelType,
                  item: chat.itemId,
                  title: chat.title,
                },
              }}
              key={chat.chatId}
              className={cls('flex items-center space-x-3 py-3 hover:bg-[#eeeeee]', idx === 0 ? '!border-t-0' : '')}>
              <div className='h-12 w-12 rounded-full bg-slate-300' />
              <div className={'inline-block'}>
                <p className='text-[15px] text-gray-700'>
                  {chat.title}
                  {chat.channelType === 'GROUP' ? (
                    <span className={'ml-1 text-sm'}>{chat.participantsCount}</span>
                  ) : null}
                </p>
                <p className='mt-0.5 w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap text-xs text-gray-500'>
                  {chat.lastMessage}
                </p>
              </div>
              <div className={'flex w-16 flex-col items-end'}>
                <span className={'ml-8 text-xs'}>{chat.lastChatAt}</span>
                <span
                  className={cls(
                    'mt-0.5',
                    chat.unreadCount === 0
                      ? 'text-xs'
                      : 'rounded-full bg-[#33CC99] px-[6px] py-[1px] text-center text-xs text-white'
                  )}>
                  {chat.unreadCount === 0 ? '읽음' : chat.unreadCount}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </Layout>
  )
}

export default Chats
