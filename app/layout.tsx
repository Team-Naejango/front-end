import React from 'react'
import './assets/css/globals.scss'
import localFont from 'next/font/local'
import Script from 'next/script'
import { Metadata } from 'next'

import NEXT_SEO_DEFAULT from '@/next-seo-config'
import { KAKAO_MAP_SDK_URL } from '@/app/libs/client/constants/sdk'
import RecoilProvider from '@/app/libs/client/recoil/RecoilProvider'
import QueryProvider from '@/app/libs/client/reactQuery/QueryProvider'
import UseAxiosWrapper from '@/app/components/molecule/common/UseAxiosWrapper'

const myFont = localFont({
  src: './assets/font/PretendardVariable.woff2',
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
      {/* <head> */}
      {/* <meta httpEquiv='Content-Security-Policy' content='upgrade-insecure-requests' /> */}
      {/* </head> */}
      <body className={myFont.className} suppressHydrationWarning>
        <Script type='text/javascript' src={KAKAO_MAP_SDK_URL} strategy='beforeInteractive' />
        <Script type='text/javascript' src={'//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'} async />
        <RecoilProvider>
          <QueryProvider>
            <UseAxiosWrapper>{children}</UseAxiosWrapper>
          </QueryProvider>
        </RecoilProvider>
      </body>
    </html>
  )
}
