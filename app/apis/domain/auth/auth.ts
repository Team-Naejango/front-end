import instance from '@/app/apis/config/axios'
import { Auth, LoginInfo, PassLoginForm } from '@/app/apis/types/domain/auth/auth'
import { Response } from '@/app/apis/types/response/response'

export type SignForm = {
  email: String
  password: String
  nickname: String
  phoneNumber: String
}

export type LoginForm = {
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
 * 회원가입
 *
 * @param params.username 아이디
 * @param params.password 비밀번호
 */
export async function sign(params: SignForm): Promise<null> {
  return instance.post('/api/user/join', params)
}

/**
 * 로그인
 *
 * @param params.username 아이디
 * @param params.password 비밀번호
 */
export async function login(params: LoginForm): Promise<{ auth: Auth }> {
  return instance.post('/api/user/login', params)
}

/**
 * 토큰 재발급
 *
 * @param params.refreshToken 리프래시 토큰
 */
export async function refresh(params: { refreshToken: string }): Promise<{ auth: Auth }> {
  return instance.post('/api/token/refresh', params)
}

/**
 * 토큰 검증
 * @param params.accessToken 액세스 토큰
 */
export async function verify(params: { accessToken: string }) {
  return instance.post('/api/token/verify', params)
}

/**
 * 이메일 중복확인
 *
 * @param params.username 아이디
 * @param params.password 비밀번호
 */
export async function emailValidity(params: LoginForm): Promise<boolean> {
  return instance.get(`/api/user/check/${params.email}`)
}

/**
 * 카카오 인증 로그인
 *
 * @param code
 * @param code.access_token Access Token
 *
 *
 */
export async function kakaoLogin(code: PassLoginForm): Promise<Response<{ auth: LoginInfo }>> {
  return instance.post(`/kakao?code=${code}`, code, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
}
