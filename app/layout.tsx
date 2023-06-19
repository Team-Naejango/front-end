import React from 'react'
import './assets/css/globals.scss'
import localFont from 'next/font/local'

import QueryProvider from '@/app/libs/client/reactQuery/QueryProvider'
import RecoilProvider from '@/app/libs/client/recoil/RecoilProvider'
import { UseAxiosInterceptor } from '@/app/hooks/useAxiosInterceptor'

const myFont = localFont({
  src: './assets/font/PretendardVariable.woff2',
  // preload: true,
})

export const metadata = {
  title: '내 잔고를 부탁해',
  description: '공동구매 및 물물교환 앱',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko-KR'>
      <body className={myFont.className} suppressHydrationWarning>
        <RecoilProvider>
          <QueryProvider>
            {/* <UseAxiosInterceptor> */}
            {children}
            {/* </UseAxiosInterceptor> */}
          </QueryProvider>
        </RecoilProvider>
      </body>
    </html>
  )
}
