import React from 'react'

import './styles/globals.css'
import localFont from 'next/font/local'
import QueryProvider from '@/app/libs/client/reactQuery/QueryProvider'

const myFont = localFont({ src: './static/fonts/PretendardVariable.woff2' })

export const metadata = {
  title: '내 잔고를 부탁해',
  description: '공동구매 및 물물교환 앱',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body className={myFont.className} suppressHydrationWarning>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
