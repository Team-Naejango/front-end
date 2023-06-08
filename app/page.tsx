'use client'

import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

import Loading from '@/app/loading'
import { refresh } from '@/app/apis/domain/auth/auth'
import { getCookie, setDeadlineCookie } from '@/app/libs/client/utils/cookie'
import { KAKAO_AUTH_TOKEN } from '@/app/libs/client/constants/store'
import Login from '@/app/(auth)/login/page'
import { ApiError } from 'next/dist/server/api-utils'
import { useSetRecoilState } from 'recoil'
import { kakaoAccessToken } from '@/app/store/atom'
import UseUpdateToken from '@/app/hooks/useUpdateToken'
import UseClearSession from '@/app/hooks/useClearSession'

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

  // todo: Recoil 초기화 작업
  const initialState = () => {}

  // 토큰 갱신
  const { mutate: mutateGetToken } = useMutation(refresh, {
    onSuccess: data => {
      const {
        token: { refreshToken, accessToken },
      } = data

      console.log('data:', data)
      UseUpdateToken(accessToken, refreshToken)
    },
    onError: (error: ApiError) => {
      console.log('error:', error)
      UseClearSession()
    },
    onSettled: () => {
      router.push('/')
    },
  })

  useEffect(() => {
    if (isAccessToken) {
      router.push('/')
    } else {
      /* 아직 api 명세가 안나왔기 떄문에 주석처리 */
      // mutateGetToken(getCookie(KAKAO_AUTH_TOKEN.갱신))
    }
  }, [isAccessToken, mutateGetToken, router])

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
