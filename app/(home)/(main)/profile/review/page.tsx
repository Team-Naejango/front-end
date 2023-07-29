'use client'

import React, { useState, Suspense } from 'react'
import { useRecoilValue } from 'recoil'
import { toast } from 'react-hot-toast'

import Layout from '@/app/components/template/main/layout/Layout'
import Button from '@/app/components/atom/Button'
import { MODAL_TYPES } from '@/app/libs/client/constants/code'
import { useModal } from '@/app/hooks/useModal'
import { modalSelector } from '@/app/store/modal'
import CustomModal from '@/app/components/molecule/modal/CustomModal'
import Loading from '@/app/loading'
import ReviewCard from '@/app/components/organism/profile/ReviewCard'
import WriteReviewPopup from '@/app/components/organism/profile/WriteReviewPopup'

const Review = () => {
  const { openModal } = useModal()
  const _review = useRecoilValue(modalSelector('review'))

  const onClickWriteReview = () => {
    openModal({
      modal: { id: 'review', type: MODAL_TYPES.CONFIRM },
      callback: () => {
        toast.success('작성하신 리뷰가 등록되었습니다.')
      },
    })
  }

  return (
    <Layout canGoBack title='리뷰내역'>
      <div className='mt-8'>
        <ReviewCard />
        <div className={'sticky bottom-0 left-0 mx-auto bg-white pb-3'}>
          <Button text={'리뷰 쓰기'} onClick={onClickWriteReview} />
        </div>
      </div>

      {_review.modal.show ? (
        <Suspense fallback={<Loading />}>
          <CustomModal id={_review.modal.id} btn>
            <WriteReviewPopup />
          </CustomModal>
        </Suspense>
      ) : null}
    </Layout>
  )
}

export default Review
