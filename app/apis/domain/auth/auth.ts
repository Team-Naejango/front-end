import { instance } from '@/app/apis/config/axios'
import { AuthToken, LoginInfo, PassLoginForm } from '@/app/apis/types/domain/auth/auth'
import { Response } from '@/app/apis/types/response/response'

/**
 * 토큰 재발급
 *
 * @param params.refreshToken 리프래시 토큰
 */
export async function refresh(params: { refreshToken: string }): Promise<Response<{ auth: AuthToken }>> {
  return instance.post('/', params)
}

/**
 * 카카오 인증 로그인
 *
 * @param code
 * @param code.access_token Access Token
 */
export async function kakaoLogin(code: PassLoginForm): Promise<Response<{ auth: LoginInfo }>> {
  return instance.post(`/kakao?code=${code}`, code, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
}

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
export async function login(params: LoginForm): Promise<{ auth: AuthToken }> {
  return instance.post('/api/user/login', params)
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

export async function test(params?: any): Promise<any> {
  return instance.get(`/sdsd`)
}
