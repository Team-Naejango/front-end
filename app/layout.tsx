import React, { lazy, Suspense } from 'react'
import './assets/css/globals.scss'
import localFont from 'next/font/local'
import Script from 'next/script'

import QueryProvider from '@/app/libs/client/reactQuery/QueryProvider'
import RecoilProvider from '@/app/libs/client/recoil/RecoilProvider'
import { KAKAO_MAP_SDK_URL } from '@/app/libs/client/constants/apiKey'
import { keywords, openGraph } from '@/app/libs/client/constants/common'
import Loading from '@/app/loading'
import { UseAxiosInterceptor } from '@/app/hooks/useAxiosInterceptor'

lazy(() => import('swiper/css'))
lazy(() => import('swiper/css/navigation'))
lazy(() => import('swiper/css/pagination'))
lazy(() => import('swiper/css/scrollbar'))

const myFont = localFont({
  src: './assets/font/PretendardVariable.woff2',
  // preload: true,
})

export const metadata = {
  title: '내 잔고를 부탁해',
  description: '1인 가구 맞춤형 공동구매 및 물물교환 커뮤니티 플랫폼',
  keywords,
  openGraph,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko-KR'>
      <body className={myFont.className} suppressHydrationWarning>
        <Script type='text/javascript' strategy='beforeInteractive' src={KAKAO_MAP_SDK_URL} />
        <RecoilProvider>
          <QueryProvider>
            <Suspense fallback={<Loading />}>
              {/* <UseAxiosInterceptor> */}
              {children}
              {/* </UseAxiosInterceptor> */}
            </Suspense>
          </QueryProvider>
        </RecoilProvider>
      </body>
    </html>
  )
}
