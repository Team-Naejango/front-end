// kakaotalk SDK 인증토큰 요청 url
// export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${
//   process.env.NEXT_PUBLIC_KAKAOTALK_REST_API_KEY
// }&redirect_uri=${
//   typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}/oauth/kakao/callback` : ''
// }&response_type=code`

const REST_API_KEY = '7cb73114517b2b689f5bdca41201b46c'
const REDIRECT_URI = 'http://localhost:3000/oauth/kakao'

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
