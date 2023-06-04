'use client'

import React from 'react'

import Lottie from 'lottie-react'
import myAnimation from '@/app/assets/animation/131005-tri-cube-loader-3.json'

const Loading = () => {
  return (
    <div className='relative z-40 mx-auto h-[770px] w-[375px] max-w-[375px] rounded-[30px] bg-[#fff]'>
      <Lottie
        className='absolute left-1/2 top-1/2 z-50 h-[160px] w-[160px] translate-x-[-50%] translate-y-[-50%]'
        animationData={myAnimation}
        loop
      />
    </div>
  )
}
export default Loading
