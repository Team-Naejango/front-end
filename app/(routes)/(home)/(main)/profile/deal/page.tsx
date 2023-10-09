'use client'

import React from 'react'
import { useRecoilValue } from 'recoil'
import dynamic from 'next/dynamic'

import Layout from '@/app/components/template/main/layout/Layout'
import DealCard from '@/app/components/organism/profile/deal/DealCard'
import { useModal } from '@/app/hooks/useModal'
import { modalSelector } from '@/app/store/modal'
import { MODAL_TYPES } from '@/app/libs/client/constants/code'
import Loading from '@/app/loading'
// import DetailDealPopup from '@/app/components/organism/profile/deal/DetailDealPopup'

const CustomModal = dynamic(() => import('@/app/components/molecule/modal/CustomModal'), {
  ssr: false,
  loading: () => <Loading />,
})

const Deal = () => {
  const { openModal } = useModal()
  const _deal = useRecoilValue(modalSelector('detailDeal'))

  // 상세 모달
  const onClickDetail = () => {
    openModal({
      modal: { id: 'detailDeal', type: MODAL_TYPES.ALERT },
    })
  }

  return (
    <Layout canGoBack title='거래 내역'>
      <div className='mt-8'>
        <DealCard onClick={onClickDetail} />
      </div>

      {_deal.modal.show ? (
        <CustomModal id={_deal.modal.id} type={MODAL_TYPES.ALERT} btn>
          {/* <DetailDealPopup /> */}
        </CustomModal>
      ) : null}
    </Layout>
  )
}

export default Deal
