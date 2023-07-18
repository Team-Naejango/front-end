import { Metadata } from 'next'

const NEXT_SEO_DEFAULT: Metadata = {
  manifest: '/manifest.json',
  themeColor: '#ffffff',
  metadataBase: new URL('https://acme.com'),
  keywords: [
    '공동구매',
    '공구',
    '물물거래',
    '물물교환',
    '중고거래',
    '1인가구',
    '커뮤니티',
    '플랫폼',
    '맞춤형',
    '생필품',
    '신선품',
  ],
  openGraph: {
    title: '내 잔고를 부탁해',
    description: '1인 가구 맞춤형 공동구매 및 물물교환 커뮤니티 플랫폼',
    url: 'https://d1ad0vl3i2dudp.cloudfront.net/',
    siteName: '내 잔고를 부탁해',
    images: [
      {
        url: 'http://naejango.s3-website.ap-northeast-2.amazonaws.com/images/splash_logo.svg',
        width: 800,
        height: 600,
      },
      {
        url: 'http://naejango.s3-website.ap-northeast-2.amazonaws.com/images/splash_logo.svg',
        width: 1800,
        height: 1600,
      },
    ],
    locale: 'ko-KR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '내 잔고를 부탁해',
    description: '1인 가구 맞춤형 공동구매 및 물물교환 커뮤니티 플랫폼',
  },
}

export default NEXT_SEO_DEFAULT
