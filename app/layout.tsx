import React, { lazy, Suspense } from 'react'
import './assets/css/globals.scss'
import localFont from 'next/font/local'
import Script from 'next/script'
import { Metadata } from 'next'

import NEXT_SEO_DEFAULT from '@/next-seo-config'
import QueryProvider from '@/app/libs/client/reactQuery/QueryProvider'
import RecoilProvider from '@/app/libs/client/recoil/RecoilProvider'
import { KAKAO_MAP_SDK_URL } from '@/app/libs/client/constants/apiKey'
import Loading from '@/app/loading'
import UseAxiosWrapper from '@/app/components/molecule/common/UseAxiosWrapper'

const myFont = localFont({
  src: './assets/font/PretendardVariable.woff2',
  // preload: true,
})

export const metadata: Metadata = {
  ...NEXT_SEO_DEFAULT,
  title: {
    template: '%s | 내 잔고를 부탁해',
    default: '내 잔고를 부탁해',
  },
  description: '1인 가구 맞춤형 공동구매 및 물물교환 커뮤니티 플랫폼',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko-KR'>
      <body className={myFont.className} suppressHydrationWarning>
        <Script type='text/javascript' src={KAKAO_MAP_SDK_URL} strategy='beforeInteractive' />
        <RecoilProvider>
          <QueryProvider>
            <Suspense fallback={<Loading />}>
              <UseAxiosWrapper>{children}</UseAxiosWrapper>
            </Suspense>
          </QueryProvider>
        </RecoilProvider>
      </body>
    </html>
  )
}
