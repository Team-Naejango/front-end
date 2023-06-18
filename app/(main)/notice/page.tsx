'use client'

import React, { useEffect } from 'react'
import gsap from 'gsap'

const Notice = () => {
  useEffect(() => {
    gsap.from('.notice-container', {
      x: '100%',
      duration: 0.5,
    })
  }, [])

  return (
    <div className='h-full w-full overflow-hidden'>
      <div className='notice-container flex h-full items-center justify-center'>
        <p>알림 페이지</p>
      </div>
    </div>
  )
}

export default Notice
