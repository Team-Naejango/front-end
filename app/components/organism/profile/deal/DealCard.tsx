'use client'

import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'
import dynamic from 'next/dynamic'
import Loading from '@/app/loading'
import { toast } from 'react-hot-toast'
import { ApiError } from 'next/dist/server/api-utils'

import { DEAL } from '@/app/libs/client/reactQuery/queryKey/chat'
import ItemList from '@/app/components/organism/profile/deal/ItemList'
import { MODAL_TYPES } from '@/app/libs/client/constants/code'
import { useModal } from '@/app/hooks/useModal'
import { modalSelector } from '@/app/store/modal'

import { deal, deleteDeal } from '@/app/apis/domain/chat/deal'

const CustomModal = dynamic(() => import('@/app/components/molecule/modal/CustomModal'), {
  ssr: false,
  loading: () => <Loading />,
})

const DealCard = ({ onClick }: { onClick: () => void }) => {
  const query = useQueryClient()
  const { openModal } = useModal()
  const _delete = useRecoilValue(modalSelector('delete'))

  // 거래 조회
  const { data: { data: deals } = {} } = useQuery([DEAL.조회], () => deal())

  // 거래내역 삭제
  const { mutate: mutateDeleteDeal } = useMutation(deleteDeal, {
    onSuccess: () => {
      toast.success('거래내역이 삭제되었습니다.')
      query.invalidateQueries([DEAL.조회])
      query.invalidateQueries([DEAL.특정거래조회])
      query.invalidateQueries([DEAL.미완료거래조회])
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // 거래내역 삭제 모달
  const onDeleteTransactionHistory = (transactionId: number) => {
    if (deals?.result?.length === 0) return

    openModal({
      modal: {
        id: 'delete',
        type: MODAL_TYPES.CONFIRM,
        title: '거래내역 삭제',
        content: '거래내역을 삭제 하시겠습니까?',
      },
      callback: () => {
        mutateDeleteDeal(String(transactionId))
      },
    })
  }

  return (
    <>
      {deals?.result?.length === 0 ? (
        <div className='flex h-[450px] items-center justify-center'>
          <p className='text-sm'>존재하는 거래내역이 없습니다.</p>
        </div>
      ) : (
        <ItemList
          items={deals?.result}
          onClick={onClick}
          onDelete={transactionId => onDeleteTransactionHistory(transactionId)}
        />
      )}

      {_delete.modal.show ? <CustomModal id={_delete.modal.id} type={MODAL_TYPES.DIALOG} /> : null}
    </>
  )
}

export default DealCard
