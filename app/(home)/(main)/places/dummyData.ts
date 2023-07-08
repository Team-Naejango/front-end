export type ItemData = {
  swap: string
}

export interface PositionType {
  id?: number
  location?: string
  title?: string
  position: { lat: number; lng: number }
  img?: string
  page?: string
  content: string
  data?: ItemData | any
  name?: string[]
}

export const positions: PositionType[] = [
  {
    id: 0,
    location: '뚝섬한강공원',
    title: '집꾸미기모임',
    position: { lat: 37.47797202145346, lng: 126.86395924548523 },
    content: '아이템1',
    img: 'http://naejango.s3-website.ap-northeast-2.amazonaws.com/images/splash_logo.svg',
    page: 'https://place.map.kakao.com/8136085',
    data: {
      swap: 'BUY',
    },
  },
  {
    id: 1,
    location: '서울숲',
    title: '애완산책모임',
    position: { lat: 37.24918854407461, lng: 127.18538014166265 },
    content: '아이템2',
    img: 'http://naejango.s3-website.ap-northeast-2.amazonaws.com/images/splash_logo.svg',
    page: 'https://place.map.kakao.com/11331488',
    data: {
      swap: 'SELL',
    },
  },
  {
    id: 2,
    location: '강남역12번출구',
    title: '맛집탐방',
    position: { lat: 37.541767609245156, lng: 126.97953068063342 },
    content: '아이템3',
    img: 'http://naejango.s3-website.ap-northeast-2.amazonaws.com/images/splash_logo.svg',
    page: 'https://place.map.kakao.com/22906012',
    data: {
      swap: 'SELL',
    },
  },
  {
    id: 3,
    location: '종합운동장역',
    title: '몰랑이모임',
    position: { lat: 37.4937436982048, lng: 126.9308740857897 },
    content: '아이템4',
    img: 'http://naejango.s3-website.ap-northeast-2.amazonaws.com/images/splash_logo.svg',
    page: 'https://place.map.kakao.com/21160812',
    data: {
      swap: 'SELL',
    },
  },
  {
    id: 4,
    location: '약수역3번출구',
    title: '마블피규어 모임',
    position: { lat: 37.492242517777214, lng: 127.04268691537477 },
    content: '아이템5',
    img: 'http://naejango.s3-website.ap-northeast-2.amazonaws.com/images/splash_logo.svg',
    page: 'https://place.map.kakao.com/21160813',
    data: {
      swap: 'BUY',
    },
  },
  {
    id: 5,
    location: 'CGV 청담씨네시티',
    title: '영화감상모임',
    position: { lat: 37.51581079217332, lng: 126.95202857643235 },
    content: '아이템6',
    img: 'http://naejango.s3-website.ap-northeast-2.amazonaws.com/images/splash_logo.svg',
    page: 'https://place.map.kakao.com/14718298',
    data: {
      swap: 'BUY',
    },
  },
  {
    id: 6,
    location: '도곡역 1번출구',
    title: '운동모임',
    position: { lat: 37.44352022762924, lng: 126.97196356870136 },
    content: '아이템7',
    img: 'http://naejango.s3-website.ap-northeast-2.amazonaws.com/images/splash_logo.svg',
    page: 'https://place.map.kakao.com/22905589',
    data: {
      swap: 'SELL',
    },
  },
  {
    id: 7,
    location: '잠원한강공원',
    title: '사이클 모임',
    position: { lat: 37.526919299925545, lng: 127.01937355463978 },
    content: '아이템8',
    img: 'http://naejango.s3-website.ap-northeast-2.amazonaws.com/images/splash_logo.svg',
    page: 'https://place.map.kakao.com/17384905',
    data: {
      swap: 'BUY',
    },
  },
  {
    id: 8,
    location: '청담역 11번출구',
    title: '제과제빵 모임',
    position: { lat: 37.4274484, lng: 126.7825603 },
    content: '아이템9',
    img: 'http://naejango.s3-website.ap-northeast-2.amazonaws.com/images/splash_logo.svg',
    page: 'https://place.map.kakao.com/10850542',
    data: {
      swap: 'BUY',
    },
  },
]
