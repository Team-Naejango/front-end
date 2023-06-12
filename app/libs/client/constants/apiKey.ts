// kakaoCallback Oauth SDK 인증토큰
export const KAKAO_AUTH_REDIRECT_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${
  process.env.NEXT_PUBLIC_KAKAOTALK_REST_API_KEY
}&redirect_uri=${
  typeof window === 'undefined' ? '' : `${window.location.protocol}//${window.location.host}/oauth/kakaoCallback`
}&response_type=code`
