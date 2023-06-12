import { instance } from '@/app/apis/config/axios'
import { AuthToken, KakaoLoginToken, LoginInfo } from '@/app/apis/types/domain/auth/auth'
import { Response } from '@/app/apis/types/response/response'
import { kakaoParams } from '@/app/(auth)/oauth/kakaoCallback/page'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

export interface SignParam {
  email: String
  password: String
  nickname: String
  phoneNumber: String
}

export interface LoginParam {
  email: String
  password: String
  name: String
  birth: String
  gender: String
  address: String
  job: String
  position: String
}

/**
 * 카카오 인증 로그인
 *
 * @param code.access_token 액세스 토큰
 */
export async function kakaoLogin(code: string): Promise<Response<null>> {
  return instance.post(`/kakao?code=${code}`, code, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
}

/**
 * 카카오 토큰 요청
 *
 * @param url
 * @param params
 */
export async function kakaoToken(url: string, params: kakaoParams | string): Promise<Response<{ token: AuthToken }>> {
  return instance.post(url, params, {
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
 * @param params.email 아이디
 * @param params.password 비밀번호
 * @param params.nickname 닉네임
 * @param params.phoneNumber 휴대폰번호
 */
export async function sign(params: SignParam): Promise<Response<boolean>> {
  return instance.post('/api/user/join', params)
}

/**
 * 이메일 중복확인
 *
 * @param params.username 아이디
 * @param params.password 비밀번호
 */
export async function emailValidity(params: LoginParam): Promise<Response<boolean>> {
  return instance.get(`/api/user/check/${params.email}`)
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
