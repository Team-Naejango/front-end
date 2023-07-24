// kakaoOauth sdk 인증토큰 url
export const KAKAO_AUTH_REDIRECT_URL = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao`

// kakaoMap sdk 인증토큰 url
export const KAKAO_MAP_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&libraries=services&autoload=false`
