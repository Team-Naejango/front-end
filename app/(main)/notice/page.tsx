'use client'

import React, { useEffect } from 'react'
import gsap from 'gsap'

const Notice = () => {
  useEffect(() => {
    gsap.fromTo(
      '.notice-container',
      {
        x: '100%',
        duration: 0.5,
      },
      {
        x: '0%',
        duration: 0.5,
      }
    )
  }, [])

  return (
    <div className='notice-container h-full w-full'>
      <div className=' flex h-full items-center justify-center'>
        <p>알림 페이지</p>
      </div>
    </div>
  )
}

export default Notice
