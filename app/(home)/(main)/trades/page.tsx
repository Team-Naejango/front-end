'use client'

import React, { useState } from 'react'

import KakaoMap from '@/app/components/molecule/common/KakaoMap'
import { useModal } from '@/app/hooks/useModal'

const Trades = () => {
  return (
    <div className='relative flex h-[100%] items-center justify-center'>
      {/* <Suspense fallback={<Loading />}> */}
      <KakaoMap />
      {/* </Suspense> */}
    </div>
  )
}

export default Trades
