'use client'

import React from 'react'
import Image from 'next/image'
import { useRecoilValue } from 'recoil'

import { cls, formatKoreanCurrency } from '@/app/libs/client/utils/util'
import { ChatResponse } from '@/app/(routes)/(home)/(main)/chats/edit/page'
import { MESSAGE_TYPE } from '@/app/libs/client/constants/code'
import { GroupChatUserInfo } from '@/app/apis/types/domain/chat/chat'
import { transactionSellerAmountState, transactionTraderAmountState } from '@/app/store/atom'

interface MessageProps {
  data: ChatResponse
  isMe: boolean
  membersInfo: GroupChatUserInfo | undefined
}

const Message = ({ data, isMe, membersInfo }: MessageProps) => {
  const transactionSellerAmount = useRecoilValue(transactionSellerAmountState)
  const transactionTraderAmount = useRecoilValue(transactionTraderAmountState)

  // 유저 이미지 필터링
  const userImage = membersInfo?.result.find(v => v.participantId === data.senderId)?.imgUrl

  // 거래 메세지
  const isTradeMessage = (message: string) => {
    return (
      message === '거래 정보 수정 성공' ||
      message === '송금 요청 성공' ||
      message === '거래 완료 요청 성공' ||
      message === '거래 삭제 성공'
    )
  }

  // 메세지 타입
  const getStatus = (value: string) => {
    return {
      SUBSCRIBE_CHANNEL: MESSAGE_TYPE.구독,
      OPEN: MESSAGE_TYPE.오픈,
      TRADE: MESSAGE_TYPE.거래,
      ENTER: MESSAGE_TYPE.입장,
      EXIT: MESSAGE_TYPE.퇴장,
      CLOSE: MESSAGE_TYPE.종료,
    }[value]
  }

  const messageType = getStatus(data.messageType)

  // 등록된 거래 유저 닉네임
  const getNickname = (membersInfo: GroupChatUserInfo | undefined, participantId: number, convert: boolean) => {
    const participant = membersInfo?.result.find(v => {
      if (convert) {
        return v.participantId !== participantId
      }
      return v.participantId === participantId
    })
    return participant?.nickname
  }

  const sellerName = getNickname(membersInfo, data.senderId, false)
  const traderName = getNickname(membersInfo, data.senderId, true)

  return messageType || isTradeMessage(data.content) ? (
    messageType === MESSAGE_TYPE.구독 ? null : messageType === MESSAGE_TYPE.거래 ||
      data.content === '거래 완료 요청 성공' ? (
      <div className={'text-center'}>
        <p className={'text-xs'}>{data.content}</p>
        <div className={'mx-auto mt-3 w-48 space-y-3 rounded-lg border p-4'}>
          <h2 className={'pb-1 text-[15px] font-medium'}>
            {messageType === MESSAGE_TYPE.거래
              ? '거래 예약'
              : data.content === '거래 완료 요청 성공'
              ? '거래 내역'
              : null}
          </h2>
          <div className={'space-y-2 whitespace-pre-wrap'}>
            <p className={'text-[13px]'}>
              <span className={'block text-[12px] text-red-600'}>판매자</span>
              {`${sellerName}`}
            </p>
            <p className={'text-[13px]'}>
              <span className={'block text-[12px] text-green-600'}>구매자</span>
              {`${traderName}`}
            </p>
            <p className={'text-[13px]'}>
              <span className={'block text-[12px]'}>거래 잔고</span>
              {`${formatKoreanCurrency(transactionSellerAmount || transactionTraderAmount)}`}
            </p>
          </div>
        </div>
      </div>
    ) : (
      <div className={'text-center'}>
        <p className={'text-xs'}>{data.content}</p>
      </div>
    )
  ) : (
    <div
      role={'presentation'}
      className={cls('flex items-end space-x-2', isMe ? 'flex-row-reverse !space-x-reverse' : '')}>
      {userImage === '' ? (
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
            userImage as string
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
