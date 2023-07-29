'use client'

import React, { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'

import Layout from '@/app/components/template/main/layout/Layout'
import Button from '@/app/components/atom/Button'
import { useModal } from '@/app/hooks/useModal'
import { modalSelector } from '@/app/store/modal'
import { MODAL_TYPES } from '@/app/libs/client/constants/code'
import Loading from '@/app/loading'
import CustomModal from '@/app/components/molecule/modal/CustomModal'
import FollowUserItemPopup from '@/app/components/organism/profile/FollowUserItemPopup'

const Follow = () => {
  const { openModal } = useModal()
  const _follow = useRecoilValue(modalSelector('itemsOfFollow'))

  const onClickReadMore = () => {
    openModal({
      modal: { id: 'itemsOfFollow', type: MODAL_TYPES.ALERT },
    })
  }

  const onClickUnFollow = () => {}

  return (
    <Layout canGoBack title='팔로우'>
      <div className={'mt-6'}>
        {...[0, 1, 2, 3].map(value => {
          return (
            <div key={value} className='border-b py-6'>
              <div className='mb-3 flex cursor-pointer items-center space-x-3 px-2 pb-3'>
                <div className={'flex w-full items-center justify-between'}>
                  <div className={'flex items-center justify-center gap-2'}>
                    <div className='h-10 w-10 rounded-full bg-slate-300' />
                    <p className='text-[13px] font-medium'>내 잔고를 부탁해</p>
                  </div>
                  <Link href={'/profile/follow'}>
                    <Button
                      small
                      text={'팔로우 취소'}
                      className={
                        '!rounded-2xl !border-[#32D7A0] !bg-white !py-2 text-xs !text-[#222] hover:!bg-[#32D7A0] hover:!text-white'
                      }
                      onClick={onClickUnFollow}
                    />
                  </Link>
                </div>
              </div>
              <div className={'flex items-center gap-2 px-2'}>
                {...[0, 1, 2].map(value => {
                  return <div key={value} className='h-24 w-24 rounded bg-slate-300' />
                })}
                <button className={'ml-1 whitespace-nowrap hover:underline'} onClick={onClickReadMore}>
                  &rarr;
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {_follow.modal.show ? (
        <Suspense fallback={<Loading />}>
          <CustomModal id={_follow.modal.id} type={MODAL_TYPES.ALERT}>
            <FollowUserItemPopup />
          </CustomModal>
        </Suspense>
      ) : null}
    </Layout>
  )
}

export default Follow
