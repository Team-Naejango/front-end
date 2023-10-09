'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'

import { CHAT } from '@/app/libs/client/reactQuery/queryKey/chat'
import { Item } from '@/app/apis/types/domain/warehouse/warehouse'
import { ChatInfoList } from '@/app/apis/types/domain/chat/chat'

import { chat } from '@/app/apis/domain/chat/chat'

const SelectChatList = ({
  selectItem,
  selectedChat,
  onSelectChat,
}: {
  selectItem: Item | null
  selectedChat: ChatInfoList | null
  onSelectChat: (chat: ChatInfoList) => void
}) => {
  // 채팅방 목록 조회
  const { data: { data: chats } = {} } = useQuery([CHAT.조회], () => chat(), {
    enabled: !!selectItem?.itemId,
  })

  return (
    <div className={'flex h-full flex-wrap items-center justify-center gap-4 py-2'}>
      {chats?.result ? (
        chats?.result.map(chat => {
          return (
            <button
              key={chat.chatId}
              className={`ml-2 whitespace-nowrap rounded-md border border-gray-300 px-4 py-2.5 text-[13px] font-medium text-[#222] shadow-sm hover:border-transparent hover:bg-[#33CC99] hover:text-[#fff] focus:outline-none ${
                selectedChat?.chatId === chat.chatId ? `border-transparent bg-[#33CC99] text-[#fff]` : ''
              }`}
              onClick={() => onSelectChat(chat)}>
              {chat.title}
            </button>
          )
        })
      ) : (
        <span className={'text-sm'}>존재하는 채팅방이 없습니다. 채팅신청을 해주세요.</span>
      )}
    </div>
  )
}

export default SelectChatList
