'use client'

import React, { lazy, Suspense, useEffect } from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'

import Loading from '@/app/loading'
import { refresh } from '@/app/apis/domain/auth/auth'
import { kakaoAccessToken } from '@/app/store/atom'
import { getCookie } from '@/app/libs/client/utils/cookie'
import { KAKAO_AUTH_TOKEN } from '@/app/libs/client/constants/store'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import Login from '@/app/(auth)/login/page'
import { useClearSession } from '@/app/hooks/useClearSession'

const MainLayout = dynamic(() => import('@/app/components/template/MainLayout'), {
  loading: () => <Loading />,
  ssr: false,
})
// const Login = dynamic(() => import('@/app/(auth)/login/page'), {
//   loading: () => <Loading />,
//   ssr: false,
// })

const App: NextPage = () => {
  const router = useRouter()
  const accessToken = false
  const { resetAccessToken, resetRefreshToken } = useClearSession()

  // console.log('accessToken:', accessToken)

  // Recoil initialState 초기화
  const initialState = () => {}

  // 토큰 갱신
  const { mutate: mutateGetToken } = useMutation(refresh, {
    onSuccess: data => {
      console.log('data:', data.success)
      // todo: 성공 시 신규 토큰값과 유저정보 전역상태 최신화하기
    },
    onError: error => {
      console.log('error:', error)
      resetAccessToken()
      resetRefreshToken()
    },
    onSettled: () => {
      router.push('/')
    },
  })

  /**
   * 로그인 유무에 따른 라우터 관리
   *
   * */
  useEffect(() => {
    if (accessToken) {
      router.push('/')
    } else {
      mutateGetToken(getCookie(KAKAO_AUTH_TOKEN.갱신))
    }
  }, [accessToken, mutateGetToken, router])

  return <main>{accessToken ? <MainLayout canGoBack /> : <Login />}</main>
}

// todo: 서버 사이드적 조건부 렌더링 검토
// App.getInitialProps = (ctx: NextPageContext) => {
//   // const { ...get } = cookies()
//
//   // console.log('get:', ...get)
//
//   // const router = useRouter()
//
//   if (ctx.req && ctx.res) {
//     ctx.res.writeHead(302, { Location: '/login' })
//     ctx.res.end()
//   } else {
//     router.push('/login')
//   }
// }

export default App
