'use client'

import React, { useEffect } from 'react'
import { KAKAO_AUTH_URL } from '@/app/libs/client/constants/apiKey'

const KakaoAuth = () => {
  useEffect(() => {
    window.location.href = KAKAO_AUTH_URL
  }, [])

  return <></>
}

export default KakaoAuth
