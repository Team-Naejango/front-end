// kakaoCallback Oauth sdk 인증토큰
// export const KAKAO_AUTH_REDIRECT_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${
//   process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY
// }&redirect_uri=${
//   typeof window === 'undefined' ? '' : `${window.location.protocol}//${window.location.host}/oauth/kakaoCallback`
// }&response_type=code`

export const KAKAO_AUTH_REDIRECT_URL = `http://43.202.25.203:8080/oauth2/authorization/kakao`
// export const KAKAO_AUTH_REDIRECT_URL = `http://43.202.25.203:8080/oauth2/authorization/kakao&redirect_uri=${
//   typeof window === 'undefined' ? '' : `${window.location.protocol}//${window.location.host}/oauth/kakaoCallback`
// }

// kakaomap sdk 인증 url
export const KAKAO_MAP_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&libraries=services&autoload=false`

// https://kauth.kakao.com/oauth/authorize?response_type=code&
// client_id=a5487753d1cfdb999c88c7fb96f0288b&scope=profile_nickname%20account_email&state=JetQBbrXoRu5lElv8xWnSZh42DlElc5LyPLmC1Uf3wU%3D&
// redirect_uri=http://43.202.25.203:8080/login/oauth2/code/kakao

// https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=a5487753d1cfdb999c88c7fb96f0288b&redirect_uri=http://43.202.25.203:8080/login/oauth2/code/kakao
