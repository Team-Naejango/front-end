'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'
import dynamic from 'next/dynamic'
import { toast } from 'react-hot-toast'
import { ApiError } from 'next/dist/server/api-utils'

import { CHAT } from '@/app/libs/client/reactQuery/queryKey/chat'
import { currentLocationState, locationRealState, locationState } from '@/app/store/atom'
import { cls } from '@/app/libs/client/utils/util'
import { E_SWITCH_STATUS, MODAL_TYPES } from '@/app/libs/client/constants/code'
import { useModal } from '@/app/hooks/useModal'
import { modalSelector } from '@/app/store/modal'
import Loading from '@/app/loading'
import UseCustomRouter from '@/app/hooks/useCustomRouter'
import { NearbyResult } from '@/app/apis/types/domain/chat/chat'

import { nearbyGroupChat } from '@/app/apis/domain/chat/channel'
import { joinGroupChat } from '@/app/apis/domain/chat/chat'

const CustomModal = dynamic(() => import('@/app/components/molecule/modal/CustomModal'), {
  ssr: false,
  loading: () => <Loading />,
})

const GroupChatCard = () => {
  const query = useQueryClient()
  const { openModal, closeModal } = useModal()
  const { push } = UseCustomRouter()

  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const isCurrentLocationStatus = useRecoilValue<E_SWITCH_STATUS>(currentLocationState)
  const userArea = useRecoilValue<{ latitude: number; longitude: number }>(locationState)
  const userRealArea = useRecoilValue<{ latitude: number; longitude: number }>(locationRealState)
  const _groupChat = useRecoilValue(modalSelector('groupChat'))

  // 근처 그룹 채팅 조회
  const { data: { data: groupChats } = {}, refetch: refetchGroupChats } = useQuery(
    [CHAT.근처그룹조회, isCurrentLocationStatus],
    () =>
      nearbyGroupChat({
        lat: String(isCurrentLocationStatus ? userRealArea.latitude : userArea.latitude),
        lon: String(isCurrentLocationStatus ? userRealArea.longitude : userArea.longitude),
        rad: '1500',
      }),
    {
      enabled: !isCurrentLocationStatus,
      cacheTime: 0,
    }
  )

  // 그룹 채팅방 참여
  const { mutate: mutateGroupJoin } = useMutation(joinGroupChat, {
    onSuccess: async data => {
      toast.success('그룹 채팅방에 입장하였습니다.')
      await query.invalidateQueries([CHAT.조회])
      push({
        pathname: '/chats/edit',
        query: {
          channel: data.data.result.channelId,
        },
      })
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // 최근 위치 on일 경우
  useEffect(() => {
    if (isCurrentLocationStatus) {
      refetchGroupChats()
    }
  }, [isCurrentLocationStatus, refetchGroupChats])

  // 근처 그룹 채팅방 선택 모달
  const onSelectedGroupChat = (chat: NearbyResult) => {
    if (!chat) {
      toast.error('등록된 그룹채팅이 없습니다. \n 잠시 후 다시 시도해주세요.')
      return closeModal('groupChat')
    }
    if (chat.participantsCount === chat.channelLimit) {
      toast.error('현재 채팅방 참여 인원수가 최대입니다. \n 잠시 후 다시 시도해주세요.')
      return closeModal('groupChat')
    }

    openModal({
      modal: {
        id: 'groupChat',
        type: MODAL_TYPES.DIALOG,
        title: '채팅 입장',
        content: '그룹 채팅방에 입장 하시겠습니까?',
      },
      callback: () => {
        closeModal('groupChat')
        mutateGroupJoin(String(chat.channelId))
      },
    })
  }

  return (
    <>
      <div
        className={cls(
          'mb-32 mt-12 overflow-y-auto rounded-xl border border-[#ececec]',
          !groupChats?.result || groupChats?.result?.length <= 2 ? 'h-auto' : 'h-[300px]'
        )}>
        <div
          className={cls(
            'mx-auto flex flex-col gap-4 bg-white px-2 py-4',
            !groupChats?.result || groupChats?.result?.length <= 2 ? 'h-inherit' : 'h-auto'
          )}>
          <p className={'mb-1 text-center text-[15px]'}>근처 그룹 채팅방</p>
          {!groupChats?.result || groupChats?.result.length === 0 ? (
            <div className={'flex h-[100px] items-center justify-center rounded border bg-white'}>
              <p className={'text-xs'}>진행중인 그룹 채팅이 없습니다.</p>
            </div>
          ) : (
            groupChats?.result.map((chat, index) => {
              return (
                <div
                  role={'presentation'}
                  key={chat.channelId}
                  className={cls(
                    'flex h-16 cursor-pointer items-center justify-start overflow-hidden rounded-lg border border-gray-300 bg-white pl-2 hover:border-[#32D7A0]',
                    activeIndex === index ? 'ring-1 ring-[#32D7A0]' : 'ring-[#ddd]'
                  )}
                  onClick={() => {
                    setActiveIndex(index)
                    onSelectedGroupChat(chat)
                  }}>
                  <div className='relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-[#33CC99]'>
                    <Image
                      key={chat?.imgUrl}
                      src={`https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/upload/item/${encodeURIComponent(
                        chat?.imgUrl
                      )}`}
                      width={'28'}
                      height={'28'}
                      alt='아이템 이미지'
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className='relative flex h-16 w-full flex-col justify-center py-1 pl-4'>
                    <p className='w-40 overflow-hidden overflow-ellipsis whitespace-nowrap text-sm'>
                      {chat.defaultTitle}
                    </p>
                    <span className='mt-1 w-40 text-xs text-gray-500'>
                      {Number(chat.participantsCount)} / {Number(chat.channelLimit)}
                    </span>
                    <span className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10'>
                      <span
                        className={chat.participantsCount === chat.channelLimit ? 'text-red-500' : 'text-green-400'}>
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
      {_groupChat.modal.show ? <CustomModal id={_groupChat.modal.id} type={MODAL_TYPES.DIALOG} /> : null}
    </>
  )
}

export default GroupChatCard
