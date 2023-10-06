'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { CompatClient, Stomp } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation, useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ApiError } from 'next/dist/server/api-utils'
import uuid from 'react-uuid'

import Layout from '@/app/components/template/main/layout/Layout'
import Message from '@/app/components/atom/Message'
import DropDown from '@/app/components/molecule/tab/DropDown'
import InputField from '@/app/components/atom/InputField'
import { CHAT } from '@/app/libs/client/reactQuery/queryKey/chat'
import getQueryClient from '@/app/libs/client/reactQuery/getQueryClient'
import Loading from '@/app/loading'
import { modalSelector } from '@/app/store/modal'
import { MODAL_TYPES } from '@/app/libs/client/constants/code'
import { useModal } from '@/app/hooks/useModal'
import SettingModal from '@/app/components/organism/chat/SettingModal'
import MenuBox from '@/app/components/organism/chat/MenuBox'
import { OAUTH } from '@/app/libs/client/reactQuery/queryKey/auth'
import { accessTokenStore, systemMessageState } from '@/app/store/atom'
import { cls } from '@/app/libs/client/utils/util'

import { chat, getChatId, recentMessage } from '@/app/apis/domain/chat/chat'
import { deleteChat, groupChatUserInfo } from '@/app/apis/domain/chat/channel'
import { userInfo } from '@/app/apis/domain/profile/profile'

const CustomModal = dynamic(() => import('@/app/components/molecule/modal/CustomModal'), {
  ssr: false,
  loading: () => <Loading />,
})

interface MessageForm {
  content: string
}

export interface ChatResponse {
  // 채널 ID
  channelId: number
  // 보내는 사람 ID
  senderId: number
  // 메세지 타입
  messageType: string
  // 메세지 내용
  content: string
  // 보내는 시간
  sentAt: string
}

const ChatDetail: NextPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = getQueryClient()
  const { openModal } = useModal()
  const client = useRef<CompatClient>()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [chatMessageList, setChatMessageList] = useState<ChatResponse[]>([])
  const [isOpenBox, setIsOpenBox] = useState<boolean>(true)
  const [systemMessage, setSystemMessage] = useState<string | undefined>(undefined)
  const [systemMessageStoreValue, setSystemMessageStoreValue] = useRecoilState<string | undefined>(systemMessageState)
  const setting = useRecoilValue(modalSelector('setting'))
  const accessToken = useRecoilValue<string>(accessTokenStore)

  const channelId = searchParams.get('channel')

  const { register, handleSubmit, reset } = useForm<MessageForm>({ mode: 'onSubmit' })

  // 채팅방 목록 조회
  const { data: { data: chats } = {} } = useQuery([CHAT.조회], () => chat(), {
    enabled: !!channelId,
  })

  // 입장한 채팅방 필터링
  const enterChatInfo = [...(chats?.result || [])].filter(chat => chat.channelId === Number(channelId)).find(v => v)

  console.log('enterChatInfo:', enterChatInfo)

  // 내 채팅방 ID 조회
  const { data: { data: chatId } = {} } = useQuery([CHAT.ID조회], () => getChatId(channelId!), {
    enabled: !!channelId,
  })

  // 채팅 참여자 조회
  const { data: { data: membersInfo } = {} } = useQuery([CHAT.참여자조회], () => groupChatUserInfo(channelId!), {
    enabled: !!channelId,
  })

  // 프로필 조회
  const { data: { data: mineInfo } = {} } = useQuery([OAUTH.유저정보], () => userInfo(), {
    enabled: !!channelId,
  })

  // 최근 메세지 기록 조회
  const { data: { data: recentMessages } = {}, refetch: refetchRecentMessage } = useQuery(
    [CHAT.메세지조회, enterChatInfo?.chatId],
    () =>
      recentMessage({
        chatId: String(enterChatInfo?.chatId),
        page: '0',
        size: '20',
      }),
    {
      enabled: !!channelId && !!chatId && !!enterChatInfo,
    }
  )

  // 유저 이미지 필터링
  const userImage = [...(membersInfo?.result || [])]
    .filter(v => v.participantId === mineInfo?.result.userId)
    .find(v => v.imgUrl)?.imgUrl

  // 채팅방 종료
  const { mutate: mutateDelete } = useMutation(deleteChat, {
    onSuccess: () => {
      toast.success('채팅방이 종료되었습니다.')
      query.invalidateQueries([CHAT.조회])
      query.invalidateQueries([CHAT.참여자조회])
      router.push('/chats')
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // 최근 메시지 기록 정보
  const getRecentMessage = useCallback(() => {
    const newMessages = [...(recentMessages?.result || [])].map(message => ({
      content: message.content,
      sentAt: message.sentAt,
      senderId: message.senderId,
      channelId: message.channelId,
      messageType: message.messageType,
    })) as ChatResponse[]

    setChatMessageList(newMessages.reverse())
  }, [recentMessages?.result])

  // 양방향 연결
  const onConnect = (channelId: string) => {
    client.current = Stomp.over(() => {
      const sockjs = new SockJS(`${process.env.NEXT_PUBLIC_API_URL}/ws-endpoint`)
      return sockjs
    })

    client.current.onStompError = () => {
      toast.error('채팅방 연결이 불안정합니다. 잠시후 다시 이용해 주세요.')
    }

    client.current.connect(
      {
        Authorization: `Bearer ${accessToken}`,
      },
      () => {
        client.current?.subscribe(
          `/sub/channel/${channelId}`,
          message => {
            const newMessage = JSON.parse(message.body)

            console.log('newMessage:', newMessage)
            setChatMessageList(prevMessages => [...prevMessages, newMessage])
          },
          { Authorization: `Bearer ${accessToken}` }
        )
      }
    )

    client.current?.onWebSocketError(() => {
      toast.error('채팅방 연결이 불안정합니다. 잠시후 다시 이용해 주세요.')
    })
  }

  // 메세지 전송
  const onSend = (data: MessageForm) => {
    if (!data) return

    if (client.current?.connected) {
      client.current?.send(`/pub/channel/${channelId}`, {}, data.content)
      reset()
    } else {
      console.log('전송 에러')
    }
  }

  // 웹소켓 마운트/언마운트
  useEffect(() => {
    onConnect(channelId!)

    return () => {
      if (client.current) {
        client.current?.disconnect()
        refetchRecentMessage()
      }
    }
  }, [])

  // 화면 위치 고정
  useEffect(() => {
    scrollRef.current?.scrollIntoView()
  }, [chatMessageList, isOpenBox])

  // 이전 메세지 기록 가져오기
  useEffect(() => {
    getRecentMessage()
  }, [getRecentMessage])

  // 시스템 메시지 전달
  useEffect(() => {
    if (systemMessage || systemMessageStoreValue) {
      if (client.current?.connected) {
        client.current?.send(`/pub/channel/${channelId}`, {}, systemMessage || systemMessageStoreValue)
        reset()
      } else {
        console.log('전송 에러')
      }
      setSystemMessage(undefined)
      setSystemMessageStoreValue(undefined)
    }
  }, [systemMessage])

  // 드롭다운 리스트 선택
  const onDropdownSelection = (label: string) => {
    if (label === '설정') {
      openModal({
        modal: {
          id: 'setting',
          type: MODAL_TYPES.ALERT,
        },
      })
    } else if (label === '나가기') {
      mutateDelete(String(channelId))
    }
  }

  // 드롭다운 라벨링
  const dropDownLabels = [{ label: '설정' }, { label: '나가기' }]

  return (
    <Layout canGoBack title={enterChatInfo?.title}>
      <DropDown labels={dropDownLabels} onClick={onDropdownSelection} />
      <div>
        <div
          role={'presentation'}
          className={cls('space-y-6 pt-10', isOpenBox ? 'pb-40' : 'pb-20')}
          onClick={() => setIsOpenBox(false)}>
          <span className={'block text-center text-xs'}>
            {chatMessageList.length === 0 ? new Date().toLocaleDateString() : new Date().toLocaleDateString()}
          </span>
          {chatMessageList.map(data => {
            return (
              <Message key={uuid()} data={data} isMe={data.senderId === mineInfo?.result.userId} imgUrl={userImage} />
            )
          })}
        </div>
        <div ref={scrollRef} />
        <form
          onSubmit={handleSubmit((formData, event) => {
            event?.preventDefault()
            onSend(formData)
          })}
          className='fixed bottom-0 left-1/2 z-[10000] w-full -translate-x-1/2 bg-white pb-5'>
          <MenuBox
            chatId={chatId?.result || null}
            itemId={enterChatInfo?.itemId || undefined}
            channelId={channelId || null}
            userInfo={mineInfo?.result || null}
            isOpen={isOpenBox}
            setSystemMessage={setSystemMessage}
            onClick={e => {
              e.preventDefault()
              setIsOpenBox(true)
            }}
          />
          <div
            role={'presentation'}
            className='relative mx-auto flex w-[90%] items-center'
            onClick={() => setIsOpenBox(false)}>
            <InputField
              type={'text'}
              register={register('content', {
                required: true,
              })}
              className='mt-4 w-full !rounded-full border-gray-300 pr-12 !indent-2 shadow-sm focus:border-[#33CC99] focus:outline-none focus:ring-[#33CC99]'
            />
            <div className='absolute inset-y-0 right-0 mt-4 flex py-1.5 pr-1.5'>
              <button
                type={'submit'}
                className='flex items-center rounded-full bg-[#33CC99] px-4 text-[15px] text-white hover:bg-[#32D7A0] focus:ring-2 focus:ring-[#33CC99] focus:ring-offset-2'>
                &rarr;
              </button>
            </div>
          </div>
        </form>
      </div>

      {setting.modal.show ? (
        <CustomModal id={setting.modal.id} type={MODAL_TYPES.ALERT}>
          <SettingModal
            channelId={channelId!}
            chatId={chatId?.result as number | null}
            title={String(enterChatInfo?.title)}
            userInfo={mineInfo?.result || undefined}
          />
        </CustomModal>
      ) : null}
    </Layout>
  )
}

export default ChatDetail
