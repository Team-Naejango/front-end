'use client'

import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

import Loading from '@/app/loading'
import { refresh } from '@/app/apis/domain/auth/auth'
import MainLayout from '@/app/components/template/MainLayout'
import Login from '@/app/(auth)/login/page'

// const MainLayout = dynamic(() => import('@/app/components/template/MainLayout'), {
//   loading: () => <Loading />,
// })
// const Login = dynamic(() => import('@/app/(auth)/login/page'), {
//   loading: () => <Loading />,
// })

const Home: NextPage = () => {
  const [tokenValid, setTokenValid] = useState<boolean>(false)

  /**
   * 유저정보 상태관리로 전역관리 필요
   */
  const navigate = useRouter()

  // 토큰 갱신
  const { mutate: mutateGetToken } = useMutation(refresh, {})

  useEffect(() => {
    /**
     * 로그인 유무에 따른 라우터 관리
     *
     * */
  }, [])

  return <main>{tokenValid ? <MainLayout canGoBack /> : <Login />}</main>
}

export default Home
