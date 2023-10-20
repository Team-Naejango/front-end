'use client'

import React from 'react'
import { useRecoilValue } from 'recoil'
import { toast } from 'react-hot-toast'
import dynamic from 'next/dynamic'

import Layout from '@/app/components/template/main/layout/Layout'
import Button from '@/app/components/atom/Button'
import { MODAL_TYPES } from '@/app/libs/client/constants/code'
import { useModal } from '@/app/hooks/useModal'
import { modalSelector } from '@/app/store/modal'
import Loading from '@/app/loading'
import ReviewCard from '@/app/components/organism/profile/review/ReviewCard'
import WriteReview from '@/app/components/organism/profile/review/WriteReview'

const CustomModal = dynamic(() => import('@/app/components/molecule/modal/CustomModal'), {
  ssr: false,
  loading: () => <Loading />,
})

/**
 * todo: 작업 보류
 *
 * */
const Review = () => {
  const { openModal } = useModal()
  const _review = useRecoilValue(modalSelector('writeReview'))

  // 리뷰등록 모달
  const onClickWriteReview = () => {
    openModal({
      modal: { id: 'writeReview', type: MODAL_TYPES.CONFIRM },
      callback: () => {
        toast.success('리뷰가 등록되었습니다.')
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
        <CustomModal id={_review.modal.id} btn>
          <WriteReview />
        </CustomModal>
      ) : null}
    </Layout>
  )
}

export default Review
