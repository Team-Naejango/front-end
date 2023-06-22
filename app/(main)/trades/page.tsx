'use client'

import React, { lazy, Suspense, useState } from 'react'
import Loading from '@/app/loading'

import KakaoMap from '@/app/components/molecule/common/KakaoMap'
import { useRecoilState } from 'recoil'
import { useModalStore } from '@/app/store/useModalStore'

// const KakaoMap = lazy(() => import('@/app/components/molecule/common/KakaoMap'))

const Trades = () => {
  const [modal, setModal] = useRecoilState(useModalStore)

  const onClickModal = () => {
    setModal(true)
  }

  return (
    <div className='relative flex h-[100%] items-center justify-center'>
      {/* <Suspense fallback={<Loading />}> */}
      <KakaoMap hasModal={modal} onClick={onClickModal} />
      {/* </Suspense> */}
    </div>
  )
}

export default Trades
