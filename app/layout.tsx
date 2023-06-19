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
            <main className='after:w-50 after:h-50 relative z-10 mx-auto h-[750px] w-[375px] max-w-xl overflow-visible bg-[#fff] p-4 after:absolute after:left-2/4 after:top-1/2 after:z-[-1] after:box-content after:block after:h-[750px] after:w-[375px] after:translate-x-[-50%] after:translate-y-[-50%] after:rounded-[30px] after:border-[10px] after:border-white after:bg-transparent after:content-[""]'>
              {children}
            </main>
            {/* </UseAxiosInterceptor> */}
          </QueryProvider>
        </RecoilProvider>
      </body>
    </html>
  )
}
