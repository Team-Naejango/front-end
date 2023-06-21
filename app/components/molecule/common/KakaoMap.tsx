'use client'

import React, { lazy, useEffect, useState, useRef } from 'react'
import { Map } from 'react-kakao-maps-sdk'

import { usePathname } from 'next/navigation'

const KakaoMap = () => {
  const pathname = usePathname()

  // useEffect(() => {
  //   if (pathname === '/trades') {
  //     setState('beforeInteractive')
  //   }
  // }, [pathname])

  return (
    <Map
      center={{ lat: 37.526047, lng: 126.935177 }}
      level={6}
      style={{
        width: '375px',
        height: '620px',
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        marginTop: '30px',
      }}
    />
  )
}

export default KakaoMap
