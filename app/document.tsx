import React, { lazy } from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

// const SwiperCSS = lazy(() => import('swiper/css'))
// const SwiperNavigationCSS = lazy(() => import('swiper/css/navigation'))
// const SwiperPaginationCSS = lazy(() => import('swiper/css/pagination'))
// const SwiperScrollbarCSS = lazy(() => import('swiper/css/scrollbar'))

export default function Document() {
  return (
    <Html>
      <Head>
        {/* <meta name='title' content='내 잔고를 부탁해' /> */}
        {/* <SwiperCSS /> */}
        {/* <SwiperNavigationCSS /> */}
        {/* <SwiperPaginationCSS /> */}
        {/* <SwiperScrollbarCSS /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
