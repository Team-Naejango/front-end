// kakaoCallback Oauth sdk 인증토큰
export const KAKAO_AUTH_REDIRECT_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${
  process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY
}&redirect_uri=${
  typeof window === 'undefined' ? '' : `${window.location.protocol}//${window.location.host}/oauth/kakaoCallback`
}&response_type=code`

// kakaoMap sdk 인증 url
export const KAKAO_MAP_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&libraries=services&autoload=false`
