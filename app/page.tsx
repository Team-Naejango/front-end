'use client'

import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { ApiError } from 'next/dist/server/api-utils'

import Loading from '@/app/loading'
import Login from '@/app/(auth)/login/page'
import { refresh } from '@/app/apis/domain/auth/auth'
import { useUpdateToken } from '@/app/hooks/useUpdateToken'
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
  const [isAccessToken, setIsAccessToken] = useState<boolean>(false)
  const { updateToken } = useUpdateToken()
  const { ResetToken } = useClearSession()

  // todo: Recoil 초기화 작업
  const initialState = () => {}

  // 토큰 갱신
  const { mutate: mutateGetToken } = useMutation(refresh, {
    onSuccess: data => {
      const {
        token: { refreshToken, accessToken },
      } = data
      console.log('data:', data)

      updateToken(accessToken, refreshToken)
      setIsAccessToken(true)
    },
    onError: (error: ApiError) => {
      console.log('error:', error)
      ResetToken()
    },
    onSettled: () => {
      router.push('/')
    },
  })

  // todo: 관련 url이 아닐 경우 후속처리
  useEffect(() => {
    if (isAccessToken) {
      router.push('/')
    } else {
      /* api 명세가 안나왔기 떄문에 주석처리 */
      // mutateGetToken(getCookie(KAKAO_AUTH_TOKEN.갱신))
    }
  }, [isAccessToken, mutateGetToken, router])

  // todo: wrap 전역 처리
  return <main>{isAccessToken ? <MainLayout canGoBack /> : <Login />}</main>
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
