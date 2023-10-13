'use client'

import React, { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { ApiError } from 'next/dist/server/api-utils'
import dynamic from 'next/dynamic'
import { useRecoilValue } from 'recoil'
import { FormProvider, useForm } from 'react-hook-form'

import { CHAT, DEAL } from '@/app/libs/client/reactQuery/queryKey/chat'
import { modalSelector } from '@/app/store/modal'
import { MODAL_TYPES, TRANSACTION_TYPE } from '@/app/libs/client/constants/code'
import { useModal } from '@/app/hooks/useModal'
import { POINTS } from '@/app/libs/client/constants/static'
import RadioPicker, { DataTypes } from '@/app/components/molecule/tab/RadioPicker'
import { OAUTH } from '@/app/libs/client/reactQuery/queryKey/auth'
import Register from '@/app/components/organism/chat/Register'
import Loading from '@/app/loading'
import { Member } from '@/app/apis/types/domain/profile/profile'
import { cls, formatIsoDate } from '@/app/libs/client/utils/util'
import { ITEM } from '@/app/libs/client/reactQuery/queryKey/warehouse'

import {
  wire,
  complete,
  deleteDeal as deleter,
  modifyDeal as modify,
  ModifyParam,
  searchDeal,
  incompleteDeal,
  deal,
} from '@/app/apis/domain/chat/deal'
import { account } from '@/app/apis/domain/warehouse/account'
import { groupChatUserInfo } from '@/app/apis/domain/chat/channel'

const CustomModal = dynamic(() => import('@/app/components/molecule/modal/CustomModal'), {
  ssr: false,
  loading: () => <Loading />,
})

export interface FormFields {
  seller: string
  dealer: string
  amount: number
}

const MenuBox = ({
  channelId,
  userInfo,
  isOpen,
  setSystemMessage,
  onClick,
}: {
  channelId: string | null
  userInfo: Member | null
  isOpen: boolean
  setSystemMessage: Dispatch<SetStateAction<string | undefined>>
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void
}) => {
  const query = useQueryClient()
  const { openModal } = useModal()
  const [selectedPoint, setSelectedPoint] = useState<DataTypes>(POINTS[0])

  const _amount = useRecoilValue(modalSelector('amount'))
  const _edit = useRecoilValue(modalSelector('edit'))
  const _send = useRecoilValue(modalSelector('send'))
  const _complete = useRecoilValue(modalSelector('complete'))
  const _delete = useRecoilValue(modalSelector('delete'))

  const formMethods = useForm<FormFields>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })
  const { watch } = formMethods

  // 참여자 정보 조회
  const { data: { data: membersInfo } = {} } = useQuery(
    [CHAT.참여자조회, channelId],
    () => groupChatUserInfo(channelId!),
    {
      enabled: !!channelId,
    }
  )

  // 1:1 상대 거래자 ID
  const getTraderId = [...(membersInfo?.result || [])].find(value => {
    return value.participantId !== userInfo?.userId
  })?.participantId

  // 미완료 거래 조회
  const { data: { data: incompleteInfo } = {}, isSuccess: isSuccessIncompleteInfo } = useQuery(
    [DEAL.미완료거래조회, getTraderId, channelId],
    () => incompleteDeal(String(getTraderId)),
    {
      enabled: !!channelId && !!getTraderId,
    }
  )

  // 거래 조회
  const { data: { data: deals } = {} } = useQuery([DEAL.조회, getTraderId], () => deal(), {
    enabled: !!channelId && !!getTraderId,
  })

  // [구매자입장] 미거래 정보
  const traderTransaction = deals?.result.find(v => v.traderId === getTraderId)

  // [판매자입장] 미거래 정보
  const sellerTransaction = incompleteInfo?.result.find(v => v)

  // 특정 거래 정보 조회
  const { data: { data: searchInfo } = {} } = useQuery(
    [DEAL.특정거래조회],
    () => searchDeal(String(sellerTransaction?.id)),
    {
      enabled: !!channelId && isSuccessIncompleteInfo && !!sellerTransaction?.id,
    }
  )

  // 판매자 유저 판별
  const isSeller = getTraderId === searchInfo?.result.traderId

  // 거래 수정
  const { mutate: mutateModify } = useMutation(modify, {
    onSuccess: data => {
      setSystemMessage(data.data.message)
      query.invalidateQueries([DEAL.조회])
      query.invalidateQueries([DEAL.미완료거래조회])
      query.invalidateQueries([DEAL.특정거래조회])
      query.invalidateQueries([ITEM.조회])
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // 거래 삭제
  const { mutate: mutateDelete } = useMutation(deleter, {
    onSuccess: data => {
      setSystemMessage(data.data.message)
      query.invalidateQueries([DEAL.조회])
      query.invalidateQueries([DEAL.미완료거래조회])
      query.invalidateQueries([DEAL.특정거래조회])
      query.invalidateQueries([ITEM.조회])
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // 거래 완료
  const { mutate: mutateComplete } = useMutation(complete, {
    onSuccess: data => {
      setSystemMessage(data.data.message)
      query.invalidateQueries([DEAL.조회])
      query.invalidateQueries([DEAL.미완료거래조회])
      query.invalidateQueries([DEAL.특정거래조회])
      query.invalidateQueries([ITEM.조회])
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // 송금 완료
  const { mutate: mutateWire } = useMutation(wire, {
    onSuccess: data => {
      setSystemMessage(data.data.message)
      query.invalidateQueries([CHAT.조회])
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // 잔고 충전
  const { mutate: mutateAccount } = useMutation(account, {
    onSuccess: () => {
      query.invalidateQueries([OAUTH.유저정보])
      toast.success('잔고 충전이 완료되었습니다.')
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // 거래수정 모달
  const modifyDeal = () => {
    openModal({
      modal: { id: 'edit', type: MODAL_TYPES.CONFIRM },
      callback: () => {
        const omitCommaAmount = String(watch('amount')).replace(/,/g, '')

        const params: ModifyParam = {
          date: formatIsoDate(),
          amount: Number(omitCommaAmount),
          transactionId: String(searchInfo?.result.id),
        }

        mutateModify(params)
      },
    })
  }

  // 송금하기 모달
  const sendPoint = useCallback(() => {
    if (traderTransaction?.progress !== '거래 예약') return toast.error('거래 예약 상태에서만 가능합니다.')

    openModal({
      modal: { id: 'send', type: MODAL_TYPES.DIALOG, title: '송금', content: '송금 하시겠습니까?' },
      callback: () => {
        mutateWire(String(traderTransaction?.id))
      },
    })
  }, [traderTransaction?.id])

  // 거래완료 모달
  const completeDeal = () => {
    if (sellerTransaction?.status !== TRANSACTION_TYPE.송금완료)
      return toast.error('구매자가 송금을 완료하지 않았습니다.')

    openModal({
      modal: { id: 'complete', type: MODAL_TYPES.DIALOG, title: '거래 완료', content: '거래를 완료 하시겠습니까?' },
      callback: () => {
        mutateComplete(String(searchInfo?.result.id))
      },
    })
  }

  // 거래삭제 모달
  const deleteDeal = () => {
    if (sellerTransaction?.status !== TRANSACTION_TYPE.거래예약) return toast.error('거래 예약 상태에서만 가능합니다.')

    openModal({
      modal: { id: 'delete', type: MODAL_TYPES.DIALOG, title: '거래 삭제', content: '거래를 삭제 하시겠습니까?' },
      callback: () => {
        mutateDelete(String(searchInfo?.result.id))
      },
    })
  }

  // 잔고 충전 모달
  const chargePoint = () => {
    openModal({
      modal: { id: 'amount', type: MODAL_TYPES.DIALOG, title: '거래 수정' },
      callback: () => {
        mutateAccount(selectedPoint.value)
      },
    })
  }

  console.log('sellerTransaction?.status', sellerTransaction?.status === TRANSACTION_TYPE.송금완료)
  console.log('searchInfo?.result:', !searchInfo?.result)
  console.log('isSeller', isSeller)

  return (
    <>
      {isOpen ? (
        <div className='flex flex-wrap text-center'>
          <button disabled className={cls('w-1/3 cursor-pointer border-r border-white bg-[#ddd] px-4 py-5')}>
            <span className='block text-sm text-white'>거래 신청</span>
          </button>
          <button
            disabled={!isSeller}
            className={cls(
              'w-1/3 cursor-pointer border-r border-white bg-[#33CC99] px-4 py-5 hover:bg-[#32D7A0]',
              !isSeller ? 'bg-[#ddd] hover:bg-[#ddd]' : ''
            )}
            onClick={modifyDeal}>
            <span className='block text-sm text-white'>거래 수정</span>
          </button>
          <button
            disabled={!isSeller}
            className={cls(
              'w-1/3 cursor-pointer bg-[#33CC99] px-4 py-5 hover:bg-[#32D7A0]',
              !isSeller ? 'bg-[#ddd] hover:bg-[#ddd]' : ''
            )}
            onClick={deleteDeal}>
            <span className='block text-sm text-white'>거래 삭제</span>
          </button>
          <button
            disabled={!isSeller}
            className={cls(
              'w-1/3 cursor-pointer border-r border-t border-white bg-[#33CC99] px-4 py-5 hover:bg-[#32D7A0]',
              !isSeller ? 'bg-[#ddd] hover:bg-[#ddd]' : ''
            )}
            onClick={completeDeal}>
            <span className='block text-sm text-white'>거래 완료</span>
          </button>
          <button
            className='w-1/3 cursor-pointer border-r border-t border-white bg-[#33CC99] px-4 py-5 hover:bg-[#32D7A0]'
            onClick={chargePoint}>
            <span className='block text-sm text-white'>금액 충전</span>
          </button>
          <button
            disabled={
              isSeller ||
              sellerTransaction?.status === TRANSACTION_TYPE.송금완료 ||
              traderTransaction?.progress !== '거래 예약'
            }
            className={cls(
              'w-1/3 cursor-pointer border-t border-white bg-[#33CC99] px-4 py-5 hover:bg-[#32D7A0]',
              isSeller ||
                sellerTransaction?.status === TRANSACTION_TYPE.송금완료 ||
                traderTransaction?.progress !== '거래 예약'
                ? 'bg-[#ddd] hover:bg-[#ddd]'
                : ''
            )}
            onClick={sendPoint}>
            <span className='block text-sm text-white'>송금 하기</span>
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

      {_amount.modal.show ? (
        <CustomModal id={_amount.modal.id} type={MODAL_TYPES.CONFIRM} btn btnTxt={'충전'}>
          <RadioPicker data={POINTS} selectedRadio={selectedPoint} setSelectedRadio={setSelectedPoint} />
        </CustomModal>
      ) : null}

      {_edit.modal.show ? (
        <FormProvider {...formMethods}>
          <CustomModal id={_edit.modal.id} type={MODAL_TYPES.CONFIRM} btn btnTxt={'수정'}>
            <Register edit userInfo={userInfo || null} transaction={searchInfo?.result} />
          </CustomModal>
        </FormProvider>
      ) : null}

      {_send.modal.show ? <CustomModal id={_send.modal.id} type={MODAL_TYPES.DIALOG} /> : null}

      {_complete.modal.show ? <CustomModal id={_complete.modal.id} type={MODAL_TYPES.DIALOG} /> : null}

      {_delete.modal.show ? <CustomModal id={_delete.modal.id} type={MODAL_TYPES.DIALOG} /> : null}
    </>
  )
}

export default MenuBox
