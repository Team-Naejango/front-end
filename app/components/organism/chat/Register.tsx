'use client'

import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'

import InputField from '@/app/components/atom/InputField'
import { FormFields } from '@/app/components/organism/chat/MenuBox'
import { formatKoreanCurrency } from '@/app/libs/client/utils/util'
import { ChatInfoList } from '@/app/apis/types/domain/chat/chat'
import { Member } from '@/app/apis/types/domain/profile/profile'
import { TransactionResult } from '@/app/apis/types/domain/chat/deal'
import { CHAT } from '@/app/libs/client/reactQuery/queryKey/chat'

import { groupChatUserInfo } from '@/app/apis/domain/chat/channel'

const Register = ({
  edit = false,
  userInfo,
  transaction,
  selectedChat,
}: {
  edit?: boolean
  userInfo: Member | null
  selectedChat?: ChatInfoList | null
  transaction?: TransactionResult
}) => {
  const {
    register,
    setValue,
    formState: { errors },
    reset,
  } = useFormContext<FormFields>()

  // 참여자 정보 조회
  const { data: { data: membersInfo } = {} } = useQuery(
    [CHAT.참여자조회],
    () => groupChatUserInfo(String(selectedChat?.channelId)),
    {
      enabled: !!selectedChat?.channelId,
    }
  )

  // 1:1 거래자 정보
  const getTraderInfo = () => {
    const sellerNm = membersInfo?.result.find(value => {
      return value.participantId === userInfo?.userId
    })?.nickname

    const traderNm = membersInfo?.result.find(value => {
      return value.participantId !== userInfo?.userId
    })?.nickname

    return { sellerNm, traderNm }
  }

  useEffect(() => {
    const { sellerNm, traderNm } = getTraderInfo()

    reset({
      seller: sellerNm,
      dealer: traderNm,
      amount: edit ? transaction?.amount : 0,
    })
  }, [selectedChat, membersInfo?.result, transaction])

  // 콤마 컨버터
  const onInputChange = (name: any, value: string) => {
    setValue(name, formatKoreanCurrency(value.replace(/[^0-9]/g, '')))
  }

  return (
    <div>
      <h2 className={'text-center'}>거래 {edit ? '수정' : '등록'}</h2>
      <div className={'mt-4'}>
        <div className={'mt-4'}>
          <InputField disabled label={'판매자 이름'} type={'text'} register={register('seller')} />
        </div>
        <div className={'mt-4'}>
          <InputField disabled label={'구매자 이름'} type={'text'} register={register('dealer')} />
        </div>
        <div className={'mt-4'}>
          <InputField
            label={'금액'}
            type={'text'}
            register={register('amount', {
              required: '금액을 입력해주세요.',
              onChange: e => {
                onInputChange('amount', e.target.value)
              },
            })}
          />
          <p className='!mt-1.5 text-xs text-red-400'>{errors.amount?.message}</p>
        </div>
      </div>
    </div>
  )
}

export default Register
