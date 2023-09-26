'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { CompatClient, Stomp } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation, useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useRecoilValue } from 'recoil'
import { ApiError } from 'next/dist/server/api-utils'
import uuid from 'react-uuid'

import Layout from '@/app/components/template/main/layout/Layout'
import Message from '@/app/components/atom/Message'
import DropDown from '@/app/components/molecule/tab/DropDown'
import InputField from '@/app/components/atom/InputField'
import { getCookie } from '@/app/libs/client/utils/cookie'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store/common'
import { CHAT } from '@/app/libs/client/reactQuery/queryKey/chat'
import getQueryClient from '@/app/libs/client/reactQuery/getQueryClient'
import Loading from '@/app/loading'
import { modalSelector } from '@/app/store/modal'
import { MODAL_TYPES } from '@/app/libs/client/constants/code'
import { useModal } from '@/app/hooks/useModal'
import SettingModal from '@/app/components/organism/chat/SettingModal'
import MenuBox from '@/app/components/organism/chat/MenuBox'
import { OAUTH } from '@/app/libs/client/reactQuery/queryKey/auth'

import { getChatId } from '@/app/apis/domain/chat/chat'
import { deleteChat, groupChatUserInfo } from '@/app/apis/domain/chat/channel'
import { userInfo } from '@/app/apis/domain/profile/profile'

const CustomModal = dynamic(() => import('@/app/components/molecule/modal/CustomModal'), {
  ssr: false,
  loading: () => <Loading />,
})

interface MessageForm {
  message: string
  reversed?: boolean
}

const ChatDetail: NextPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = getQueryClient()
  const { openModal } = useModal()
  const client = useRef<CompatClient>()
  const scrollRef = useRef<HTMLDivElement>(null)
  const accessToken = getCookie(AUTH_TOKEN.접근)
  const [chatMessageList, setChatMessageList] = useState<MessageForm[]>([])
  const [isOpenBox, setIsOpenBox] = useState<boolean>(true)
  const setting = useRecoilValue(modalSelector('setting'))

  const channelId = searchParams.get('id')
  const channelType = searchParams.get('type')
  const title = searchParams.get('title')

  const { register, handleSubmit, reset } = useForm<MessageForm>({ mode: 'onSubmit' })

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

  const isMe = [...(membersInfo?.result || [])].some(v => v.participantId === mineInfo?.result.userId)
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

  // 양방향 연결
  const onConnect = (channelId: string) => {
    client.current = Stomp.over(() => {
      const sockjs = new SockJS(`${process.env.NEXT_PUBLIC_API_URL}/ws-endpoint`)
      return sockjs
    })

    client.current.connect(
      {
        Authorization: `Bearer ${accessToken}`,
      },
      () => {
        client.current?.subscribe(
          `${process.env.NEXT_PUBLIC_API_URL}/sub/channel/${channelId}`,
          message => {
            console.log('message:', message)
            const newMessage = JSON.parse(message.body)
            setChatMessageList(prevMessages => [...prevMessages, newMessage])
            // setChatMessageList(newMessage)
          },
          { Authorization: `Bearer ${accessToken}` }
        )
      }
    )

    client.current?.activate()
  }

  // 전송
  const onSend = (data: MessageForm) => {
    if (!data) return

    if (client.current?.connected) {
      client.current?.send(`${process.env.NEXT_PUBLIC_API_URL}/pub/channel/${channelId}`, {}, data.message)
      setChatMessageList(prevMessages => [...prevMessages, data])
      reset()
    } else {
      console.log('전송 에러')
    }
  }

  useEffect(() => {
    onConnect(channelId!)

    return () => {
      if (client.current) {
        client.current?.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollIntoView()
  }, [chatMessageList])

  // 드롭다운에서 각 탭별 실행 컨텍스트
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

  const onSelectedMenuBox = (open: boolean) => {
    setIsOpenBox(open)
  }

  // 드롭다운 라벨링
  const labels = [{ label: '설정' }, { label: '나가기' }]

  return (
    <Layout canGoBack title={title!}>
      <DropDown labels={labels} onClick={onDropdownSelection} />
      <div className='space-y-6 py-10 pb-16'>
        <span className={'block text-center text-xs'}>
          {chatMessageList.length === 0 ? new Date().toLocaleDateString() : ''}
        </span>
        {chatMessageList.map(data => {
          return <Message key={uuid()} message={data.message} imgUrl={userImage} reverse={isMe} />
        })}
        <div ref={scrollRef} />
        <form
          onSubmit={handleSubmit((formData, event) => {
            event?.preventDefault()
            onSend(formData)
          })}
          className='fixed bottom-0 left-1/2 z-[10000] w-full -translate-x-1/2 bg-white py-2 pb-5'>
          <MenuBox
            channelId={channelId!}
            chatId={chatId?.result || null}
            channelType={channelType || ''}
            isOpen={isOpenBox}
            onClick={e => {
              e.preventDefault()
              onSelectedMenuBox(true)
            }}
          />
          <div
            role={'presentation'}
            className='relative mx-auto flex w-[90%] items-center'
            onClick={() => onSelectedMenuBox(false)}>
            <InputField
              type={'text'}
              register={register('message', {
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
          <SettingModal channelId={channelId!} chatId={chatId?.result as number | null} title={title!} />
        </CustomModal>
      ) : null}
    </Layout>
  )
}

export default ChatDetail
