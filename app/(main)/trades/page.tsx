'use client'

import React, { lazy, useState } from 'react'

const KakaoMap = lazy(() => import('@/app/components/molecule/common/KakaoMap'))

const Trades = () => {
  return (
    <div className='relative flex h-[100%] items-center justify-center'>
      <KakaoMap />
    </div>
  )
}

export default Trades
