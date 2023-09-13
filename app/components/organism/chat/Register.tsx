'use client'

import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import InputField from '@/app/components/atom/InputField'
import { FormFields } from '@/app/components/organism/chat/MenuBox'
import { formatKoreanCurrency } from '@/app/libs/client/utils/util'
import { Participant } from '@/app/apis/types/domain/chat/chat'

const Register = ({ chatId, participants }: { chatId: number | null; participants: Participant[] }) => {
  const {
    register,
    setValue,
    formState: { errors },
    reset,
  } = useFormContext<FormFields>()

  // 1:1 거래자 정보
  const getTraderInfo = () => {
    const sellerNm = participants.find(value => {
      return value.participantId === chatId
    })?.nickname

    const traderNm = participants.find(value => {
      return value.participantId !== chatId
    })?.nickname

    return { sellerNm, traderNm }
  }

  useEffect(() => {
    const { sellerNm, traderNm } = getTraderInfo()

    reset({
      item: '2323',
      seller: sellerNm,
      dealer: traderNm,
    })
  }, [])

  // 콤마 컨버터
  const onInputChange = (name: any, value: string) => {
    setValue(name, formatKoreanCurrency(value.replace(/[^0-9]/g, '')))
  }

  return (
    <div>
      <h2 className={'text-center'}>거래 등록</h2>
      <div className={'mt-4'}>
        <div className={'mt-4'}>
          <InputField disabled label={'아이템명'} type={'text'} register={register('item')} />
        </div>
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
              value: 0,
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
