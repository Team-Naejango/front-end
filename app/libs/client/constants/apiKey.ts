// kakao Oauth SDK 인증토큰
export const KAKAO_AUTH_REDIRECT_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${
  process.env.KAKAO_REST_API_KEY
}&redirect_uri=${
  typeof window === 'undefined' ? '' : `${window.location.protocol}//${window.location.host}/oauth/kakao`
}&response_type=code`
