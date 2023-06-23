interface PositionType {
  id: number
  location: string
  title: string
  latlng: { latitude: number; longitude: number }
  img: string
  page: string
}

export const positions: PositionType[] = [
  {
    id: 0,
    location: '뚝섬한강공원',
    title: '집꾸미기모임',
    latlng: { latitude: 37.47797202145346, longitude: 126.86395924548523 },
    img: 'http://naejango.s3-website.ap-northeast-2.amazonaws.com/images/splash_logo.svg',
    page: 'https://place.map.kakao.com/8136085',
  },
  {
    id: 1,
    location: '서울숲',
    title: '애완산책모임',
    latlng: { latitude: 37.24918854407461, longitude: 127.18538014166265 },
    img: 'http://naejango.s3-website.ap-northeast-2.amazonaws.com/images/splash_logo.svg',
    page: 'https://place.map.kakao.com/11331488',
  },
  {
    id: 2,
    location: '강남역12번출구',
    title: '맛집탐방',
    latlng: { latitude: 37.541767609245156, longitude: 126.97953068063342 },
    img: 'http://naejango.s3-website.ap-northeast-2.amazonaws.com/images/splash_logo.svg',
    page: 'https://place.map.kakao.com/22906012',
  },
  {
    id: 3,
    location: '종합운동장역',
    title: '몰랑이모임',
    latlng: { latitude: 37.4937436982048, longitude: 126.9308740857897 },
    img: 'http://naejango.s3-website.ap-northeast-2.amazonaws.com/images/splash_logo.svg',
    page: 'https://place.map.kakao.com/21160812',
  },
  {
    id: 4,
    location: '약수역3번출구',
    title: '마블피규어 모임',
    latlng: { latitude: 37.492242517777214, longitude: 127.04268691537477 },
    img: 'http://naejango.s3-website.ap-northeast-2.amazonaws.com/images/splash_logo.svg',
    page: 'https://place.map.kakao.com/21160813',
  },
  {
    id: 5,
    location: 'CGV 청담씨네시티',
    title: '영화감상모임',
    latlng: { latitude: 37.51581079217332, longitude: 126.95202857643235 },
    img: 'http://naejango.s3-website.ap-northeast-2.amazonaws.com/images/splash_logo.svg',
    page: 'https://place.map.kakao.com/14718298',
  },
  {
    id: 6,
    location: '도곡역 1번출구',
    title: '운동모임',
    latlng: { latitude: 37.44352022762924, longitude: 126.97196356870136 },
    img: 'http://naejango.s3-website.ap-northeast-2.amazonaws.com/images/splash_logo.svg',
    page: 'https://place.map.kakao.com/22905589',
  },
  {
    id: 7,
    location: '잠원한강공원',
    title: '사이클 모임',
    latlng: { latitude: 37.526919299925545, longitude: 127.01937355463978 },
    img: 'http://naejango.s3-website.ap-northeast-2.amazonaws.com/images/splash_logo.svg',
    page: 'https://place.map.kakao.com/17384905',
  },
  {
    id: 8,
    location: '청담역 11번출구',
    title: '제과제빵 모임',
    latlng: { latitude: 37.4274484, longitude: 126.7825603 },
    img: 'http://naejango.s3-website.ap-northeast-2.amazonaws.com/images/splash_logo.svg',
    page: 'https://place.map.kakao.com/10850542',
  },
]
