'use client'

import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { useRecoilValue } from 'recoil'

import Login from '@/app/(auth)/login/page'
import Home from '@/app/(main)/home/page'
import { kakaoAccessToken, splashState } from '@/app/store/atom'
import { removeCookie } from '@/app/libs/client/utils/cookie'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store'

const App: NextPage = () => {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const accessToken = useRecoilValue(kakaoAccessToken)
  const isWaitSplashComplete = useRecoilValue(splashState)

  console.log('isWaitSplashComplete:', isWaitSplashComplete)

  // todo: 관련 url이 아닐 경우 후속처리
  useEffect(() => {
    if (accessToken) {
      setIsLoggedIn(true)
      router.push('/home')
    } else {
      removeCookie(AUTH_TOKEN.갱신)
      router.push('/')
    }
  }, [accessToken, router])

  // todo: wrap 전역 처리
  return <>{isLoggedIn ? <Home /> : <Login isWaitSplashComplete={isWaitSplashComplete} />}</>
}

// todo: 서버사이드적 조건부 렌더링 검토
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
