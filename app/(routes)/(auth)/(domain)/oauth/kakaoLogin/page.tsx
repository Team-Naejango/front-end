'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { KAKAO_AUTH_REDIRECT_URL } from '@/app/libs/client/constants/sdk'
import Loading from '@/app/loading'

const KakaoLogin = () => {
  const router = useRouter()

  useEffect(() => {
    router.push(KAKAO_AUTH_REDIRECT_URL)
  }, [])

  return <Loading />
}

export default KakaoLogin
