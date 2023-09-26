'use client'

import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { ApiError } from 'next/dist/server/api-utils'
import dynamic from 'next/dynamic'
import { useRecoilValue } from 'recoil'
import { FormProvider, useForm } from 'react-hook-form'

import { CHAT, DEAL } from '@/app/libs/client/reactQuery/queryKey/chat'
import getQueryClient from '@/app/libs/client/reactQuery/getQueryClient'
import { modalSelector } from '@/app/store/modal'
import { MODAL_TYPES } from '@/app/libs/client/constants/code'
import { useModal } from '@/app/hooks/useModal'
import { POINTS } from '@/app/libs/client/constants/static'
import RadioPicker, { DataTypes } from '@/app/components/molecule/tab/RadioPicker'
import { OAUTH } from '@/app/libs/client/reactQuery/queryKey/auth'
import Register from '@/app/components/organism/chat/Register'
import Loading from '@/app/loading'

import {
  wire,
  complete,
  deleteDeal as deleted,
  modifyDeal as modify,
  saveDeal as registered,
  DealParam,
  ModifyParam,
  deal,
} from '@/app/apis/domain/chat/deal'
import { account } from '@/app/apis/domain/warehouse/account'
import { groupChatUserInfo } from '@/app/apis/domain/chat/channel'

const CustomModal = dynamic(() => import('@/app/components/molecule/modal/CustomModal'), {
  ssr: false,
  loading: () => <Loading />,
})

export interface FormFields {
  item: string
  seller: string
  dealer: string
  amount: number
}

const MenuBox = ({
  channelId,
  chatId,
  channelType,
  isOpen,
  onClick,
}: {
  channelId: string
  chatId: number | null
  channelType: string | ''
  isOpen: boolean
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void
}) => {
  const query = getQueryClient()
  const { openModal } = useModal()
  const [transactionId, setTransactionId] = useState<number | undefined>(undefined)
  const [selectedPoint, setSelectedPoint] = useState<DataTypes>(POINTS[0])
  const [isSendPoint, setIsSendPoint] = useState<boolean>(false)
  const amount = useRecoilValue(modalSelector('amount'))
  const _register = useRecoilValue(modalSelector('register'))

  const formMethods = useForm<FormFields>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })
  const { getValues } = formMethods

  // 거래 조회
  const { data: { data: deals } = {} } = useQuery([DEAL.조회], () => deal(), {
    enabled: !!channelId,
  })

  // 참여자 정보 조회
  const { data: { data: membersInfo } = {} } = useQuery([CHAT.참여자조회], () => groupChatUserInfo(channelId), {
    enabled: !!channelId,
  })

  // 거래 등록
  const { mutate: mutateRegister } = useMutation(registered, {
    onSuccess: data => {
      setTransactionId(data.data.result.id)

      // todo: 거래 등록 메세지 전달
      query.invalidateQueries([DEAL.조회])
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // 거래 수정
  const { mutate: mutateModify } = useMutation(modify, {
    onSuccess: () => {
      // todo: 거래 수정 메세지 전달
      query.invalidateQueries([DEAL.조회])
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // 거래 삭제
  const { mutate: mutateDelete } = useMutation(deleted, {
    onSuccess: () => {
      // todo: 거래 삭제 메세지 전달
      query.invalidateQueries([DEAL.조회])
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // 거래 완료
  const { mutate: mutateComplete } = useMutation(complete, {
    onSuccess: () => {
      // todo: 거래 완료 메세지 전달
      query.invalidateQueries([DEAL.조회])
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // 송금 완료
  const { mutate: mutateWire } = useMutation(wire, {
    onSuccess: () => {
      // todo: 송금버튼 disabled 처리
      setIsSendPoint(true)

      // todo: 송금 완료 메세지 전달
      // query.invalidateQueries([CHAT.조회])
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // 포인트 충전
  const { mutate: mutateAccount } = useMutation(account, {
    onSuccess: () => {
      query.invalidateQueries([OAUTH.유저정보])
      toast.success('포인트 충전이 완료되었습니다.')
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // [판매자기준] 거래 ID 조회
  const getTransactionId = () => {
    const getTraderName = membersInfo?.result.find(value => {
      return value.participantId !== chatId
    })?.nickname

    const transactionId = deals && deals.result.find(v => v.traderName === getTraderName)!.id
    setTransactionId(transactionId)
  }

  // 판매자 유저 판별
  const isSeller = membersInfo?.result.some(v => v.participantId === chatId)

  useEffect(() => {
    getTransactionId()
  }, [])

  // 1:1 상대 거래자 ID
  const getTraderId = () => {
    return membersInfo?.result.find(value => {
      return value.participantId !== chatId
    })?.participantId
  }

  // 현재 날짜 변환
  const formatIsoDate = () => {
    let now = new Date()
    return now.toISOString()
  }

  const registerDeal = () => {
    // if (getTraderId() === undefined) return toast.error('구매자가 없습니다.')
    // if (!isSendPoint) return toast.error('구매자가 미송금 상태입니다.')

    // todo: 어떤 아이템인지 ID 가져오기
    openModal({
      modal: { id: 'register', type: MODAL_TYPES.CONFIRM },
      callback: () => {
        if (getValues('amount') <= 0) return toast.error('최소 금액을 입력해주세요.')

        const params: DealParam = {
          date: formatIsoDate(),
          amount: getValues('amount'),
          traderId: getTraderId()!,
          itemId: 0,
        }

        mutateRegister(params)
      },
    })
  }

  const modifyDeal = () => {
    const params: ModifyParam = {
      date: formatIsoDate(),
      amount: 0,
      transactionId: String(transactionId),
    }

    mutateModify(params)
  }

  const deleteDeal = () => {
    mutateDelete(String(transactionId))
  }

  const completeDeal = () => {
    mutateComplete(String(transactionId))
  }

  const sendPoint = () => {
    mutateWire(String(transactionId))
  }

  const chargePoint = () => {
    openModal({
      modal: { id: 'amount', type: MODAL_TYPES.CONFIRM },
      callback: () => {
        mutateAccount(selectedPoint.value)
      },
    })
  }

  return (
    <>
      {isOpen ? (
        <div className='flex flex-wrap text-center'>
          <button
            // disabled={!isSeller}
            className='w-1/3 cursor-pointer border-r border-white bg-[#33CC99] px-4 py-5 hover:bg-[#32D7A0]'
            onClick={registerDeal}>
            <span className='block text-sm text-white'>거래 등록</span>
          </button>
          <button
            disabled={!isSeller}
            className='w-1/3 cursor-pointer border-r border-white bg-[#33CC99] px-4 py-5 hover:bg-[#32D7A0]'
            onClick={modifyDeal}>
            <span className='block text-sm text-white'>거래 수정</span>
          </button>
          <button
            disabled={!isSeller}
            className='w-1/3 cursor-pointer bg-[#33CC99] px-4 py-5 hover:bg-[#32D7A0]'
            onClick={deleteDeal}>
            <span className='block text-sm text-white'>거래 삭제</span>
          </button>
          <button
            disabled={!isSeller}
            className='w-1/3 cursor-pointer border-r border-t border-white bg-[#33CC99] px-4 py-5 hover:bg-[#32D7A0]'
            onClick={completeDeal}>
            <span className='block text-sm text-white'>거래 완료</span>
          </button>
          <button
            disabled={isSeller}
            className='w-1/3 cursor-pointer border-r border-t border-white bg-[#33CC99] px-4 py-5 hover:bg-[#32D7A0]'
            onClick={sendPoint}>
            <span className='block text-sm text-white'>송금 하기</span>
          </button>
          <button
            className='w-1/3 cursor-pointer border-t border-white bg-[#33CC99] px-4 py-5 hover:bg-[#32D7A0]'
            onClick={chargePoint}>
            <span className='block text-sm text-white'>금액 충전</span>
          </button>
        </div>
      ) : (
        <div
          role={'presentation'}
          className={'w-full cursor-pointer rounded-t-[10px] bg-[#33CC99] py-2.5 text-center hover:bg-[#32D7A0]'}
          onClick={onClick}>
          <span className={'relative text-sm text-white'}>
            채널 메뉴
            <span className={'ml-1 inline-block align-text-top'}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='h-4 w-4'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 15.75l7.5-7.5 7.5 7.5' />
              </svg>
            </span>
          </span>
        </div>
      )}

      {amount.modal.show ? (
        <CustomModal id={amount.modal.id} type={MODAL_TYPES.CONFIRM} btn btnTxt={'충전'}>
          <RadioPicker data={POINTS} selectedRadio={selectedPoint} setSelectedRadio={setSelectedPoint} />
        </CustomModal>
      ) : null}

      {_register.modal.show ? (
        <FormProvider {...formMethods}>
          <CustomModal id={_register.modal.id} type={MODAL_TYPES.CONFIRM} btn btnTxt={'등록'}>
            <Register chatId={chatId} participants={membersInfo?.result || []} />
          </CustomModal>
        </FormProvider>
      ) : null}
    </>
  )
}

export default MenuBox
