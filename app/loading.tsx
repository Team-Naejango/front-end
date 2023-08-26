'use client'

import React from 'react'
import Lottie from 'lottie-react'

import myAnimation from '@/app/assets/animation/131005-tri-cube-loader-3.json'

const Loading = ({ classNames }: { classNames?: string }) => {
  return (
    <div
      className={`absolute left-0 top-0 z-[9999] mx-auto h-full max-h-full w-full max-w-full rounded-[22px] bg-transparent ${classNames}`}>
      <Lottie
        className='absolute left-1/2 top-1/2 z-50 h-[128px] w-[128px] translate-x-[-50%] translate-y-[-50%]'
        animationData={myAnimation}
        loop
      />
    </div>
  )
}

export default Loading
