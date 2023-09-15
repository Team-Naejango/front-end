'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { CompatClient, Stomp } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useMutation, useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useRecoilValue } from 'recoil'
import { ApiError } from 'next/dist/server/api-utils'

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

import { getChatId } from '@/app/apis/domain/chat/chat'
import { deleteChat } from '@/app/apis/domain/chat/channel'

const CustomModal = dynamic(() => import('@/app/components/molecule/modal/CustomModal'), {
  ssr: false,
  loading: () => <Loading />,
})

interface MessageForm {
  message: string
}

const dummyData = [
  { message: '미친놈을 보면 짓는 개', reversed: false },
  { message: '테스트테스트 테스트', reversed: true },
  { message: '왈왈', reversed: false },
]

const ChatDetail: NextPage = () => {
  const params = useParams()
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

  const channelType = searchParams.get('channelType')
  const title = searchParams.get('title')

  const { register, handleSubmit, reset } = useForm<MessageForm>({ mode: 'onSubmit' })

  // 내 채팅방 ID 조회
  const { data: { data: chatId } = {} } = useQuery([CHAT.ID조회], () => getChatId(params.id), {
    enabled: !!params,
  })

  // 채팅방 종료
  const { mutate: mutateDelete } = useMutation(deleteChat, {
    onSuccess: () => {
      query.invalidateQueries([CHAT.조회])
      query.invalidateQueries([CHAT.참여자조회])
      toast.success('채팅방이 종료되었습니다.')
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

    client.current!.connect(
      {
        Authorization: `Bearer ${accessToken}`,
      },
      () => {
        client.current!.subscribe(
          `${process.env.NEXT_PUBLIC_API_URL}/sub/channel/${channelId}`,
          message => {
            console.log('message:', message)
            const newMessage = JSON.parse(message.body)
            setChatMessageList(prevMessages => [...prevMessages, newMessage])
          },
          { Authorization: `Bearer ${accessToken}` }
        )
      }
    )
  }

  // 전송
  const onSend = (data: MessageForm) => {
    if (!data) return

    client.current?.send(`${process.env.NEXT_PUBLIC_API_URL}/pub/channel/${params.id}`, {}, JSON.stringify(data))
    reset()
  }

  // todo: 언마운트 시 커넥트 취소 처리
  useEffect(() => {
    onConnect(params.id)
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
      mutateDelete(String(chatId && chatId.result))
    }
  }

  const selectedMenuBox = (open: boolean) => {
    setIsOpenBox(open)
  }

  // 드롭다운 라벨링
  const labels = [{ label: '설정' }, { label: '나가기' }]

  return (
    <Layout canGoBack title={title!}>
      <DropDown labels={labels} onClick={onDropdownSelection} />
      <div className='space-y-6 py-10 pb-16'>
        <span className={'block text-center text-xs'}>2023.08.29 (화)</span>
        {dummyData.map(data => {
          return <Message key={data.message} message={data.message} avatarUrl={''} reversed={data.reversed} />
        })}
        <div ref={scrollRef} />
        <form
          onSubmit={handleSubmit(onSend)}
          className='fixed bottom-0 left-1/2 z-[10000] w-full -translate-x-1/2 bg-white py-2 pb-5'>
          <MenuBox
            channelId={params.id}
            chatId={chatId?.result || null}
            channelType={channelType || null}
            isOpen={isOpenBox}
            onClick={e => {
              e.preventDefault()
              selectedMenuBox(true)
            }}
          />
          <div
            role={'presentation'}
            className='relative mx-auto flex w-[90%] items-center'
            onClick={e => {
              e.preventDefault()
              selectedMenuBox(false)
            }}>
            <InputField
              type={'text'}
              register={register('message', {
                required: true,
              })}
              className='mt-4 w-full !rounded-full border-gray-300 pr-12 !indent-2 shadow-sm focus:border-[#33CC99] focus:outline-none focus:ring-[#33CC99]'
            />
            <div className='absolute inset-y-0 right-0 mt-4 flex py-1.5 pr-1.5'>
              <button className='flex items-center rounded-full bg-[#33CC99] px-4 text-[15px] text-white hover:bg-[#32D7A0] focus:ring-2 focus:ring-[#33CC99] focus:ring-offset-2'>
                &rarr;
              </button>
            </div>
          </div>
        </form>
      </div>

      {setting.modal.show ? (
        <CustomModal id={setting.modal.id} type={MODAL_TYPES.ALERT}>
          <SettingModal channelId={params.id} chatId={chatId?.result as number | null} title={title!} />
        </CustomModal>
      ) : null}
    </Layout>
  )
}

export default ChatDetail
