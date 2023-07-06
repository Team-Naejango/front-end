import { instance } from '@/app/apis/config/axios/instance'
import { AuthToken, KakaoLoginToken, LoginInfo } from '@/app/apis/types/domain/auth/auth'
import { Response } from '@/app/apis/types/response/response'

export interface SignParams {
  nickname: String
  birth: number
  gender: String
}

/**
 * 카카오 인증 로그인
 *
 * @param code authorization
 */
export async function kakaoLogin(code: string): Promise<Response<{ data: KakaoLoginToken }>> {
  return instance.get(`/login/oauth/kakao?code=${code}`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
  })
}

export async function kakao2(code: string): Promise<Response<{ data: KakaoLoginToken }>> {
  return instance.get(`/login/oauth2/code/kakao?code=${code}`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
  })
}

export async function kakao3(): Promise<Response<{ data: KakaoLoginToken }>> {
  return instance.get(`/oauth2/authorization/kakao`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
  })
}

/**
 * 카카오 유저정보
 *
 * @param url
 * @param accessToken
 */
export async function kakaoUserInfo(url: string, accessToken: string): Promise<Response<{ loginInfo: LoginInfo }>> {
  return instance.get(url, {
    headers: { Authorization: accessToken },
  })
}

/**
 * 회원가입
 *
 * @param params.nickname 닉네임
 * @param params.birth 생년월일
 */
export async function sign(params: SignParams): Promise<Response<boolean>> {
  return instance.post('/api/user/join', params)
}

/**
 * 닉네임 중복확인
 *
 * @param username 닉네임
 */
export async function nickNameValidity(username: string): Promise<Response<boolean>> {
  return instance.get(`/api/user/check/${username}`)
}

/**
 * 토큰 재발급
 *
 * @param params.refreshToken 리프래시 토큰
 */
export async function refresh(params: { refreshToken: string }): Promise<Response<{ token: AuthToken }>> {
  return instance.post('/', params)
}

// /**
//  * 로그인
//  *
//  * @param params.email 아이디
//  * @param params.password 비밀번호
//  * @param params.name 이름
//  * @param params.birth 생년월일
//  * @param params.gender 성별
//  * @param params.address 주소
//  * @param params.job 직업
//  * @param params.position 위치
//  */
// export async function login(params: LoginForm): Promise<{ auth: AuthToken }> {
//   return instance.post('/api/user/login', params)
// }
