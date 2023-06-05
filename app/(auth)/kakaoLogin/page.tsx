'use client'

import React, { useEffect } from 'react'

import { KAKAO_AUTH_URL } from '@/app/libs/client/constants/apiKey'
import Loading from '@/app/loading'

const KakaoLogin = () => {
  useEffect(() => {
    window.location.href = KAKAO_AUTH_URL
  }, [])

  return <Loading />
}

export default KakaoLogin
