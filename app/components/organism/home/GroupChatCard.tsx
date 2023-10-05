'use client'

import React from 'react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'

import { CHAT } from '@/app/libs/client/reactQuery/queryKey/chat'
import { locationState } from '@/app/store/atom'
import { cls } from '@/app/libs/client/utils/util'

import { nearbyGroupChat } from '@/app/apis/domain/chat/channel'

const GroupChatCard = () => {
  const userArea = useRecoilValue<{ latitude: number; longitude: number }>(locationState)

  // 근처 그룹채팅 조회
  const { data: { data: groupChats } = {} } = useQuery([CHAT.근처그룹조회], () =>
    nearbyGroupChat({
      lon: String(userArea.longitude),
      lat: String(userArea.latitude),
      rad: '1000',
    })
  )

  return (
    <div
      className={cls(
        'mb-24 mt-16 overflow-y-auto rounded-xl border border-[#ececec]',
        !groupChats?.result || (groupChats?.result.length || 0) <= 2 ? 'h-auto' : 'h-[300px]'
      )}>
      <div className='h-inherit mx-auto flex flex-col gap-4 bg-[#F3F4F6] p-4'>
        <p className={'text-left text-sm'}>근처 그룹 채팅방</p>
        {!groupChats?.result || groupChats?.result.length === 0 ? (
          <div className={'flex h-[100px] items-center justify-center rounded border bg-white'}>
            <p className={'text-xs'}>진행중인 그룹 채팅이 없습니다.</p>
          </div>
        ) : (
          groupChats?.result.map(chat => {
            return (
              <div
                key={chat.channelId}
                className='flex h-16 cursor-auto items-center justify-start overflow-hidden rounded-lg border border-gray-300 bg-white'>
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
                  <p className='w-40 overflow-hidden overflow-ellipsis whitespace-nowrap text-sm'>
                    {chat.defaultTitle}
                  </p>
                  <span className='mt-1 w-40 text-xs text-gray-500'>{chat.participantsCount / chat.channelLimit}</span>
                  <span className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10'>
                    <span className={chat.participantsCount === chat.channelLimit ? 'text-red-500' : 'text-green-400'}>
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

export default GroupChatCard
