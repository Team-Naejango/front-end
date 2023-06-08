import { instance } from '@/app/apis/config/axios'
import { AuthToken, LoginInfo } from '@/app/apis/types/domain/auth/auth'
import { Response } from '@/app/apis/types/response/response'

export interface SignForm {
  email: String
  password: String
  nickname: String
  phoneNumber: String
}

export interface LoginForm {
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
 * @param code
 * @param code.access_token 액세스 토큰
 */
export async function kakaoLogin(code: AuthToken): Promise<Response<{ auth: LoginInfo }>> {
  return instance.post(`/kakao?code=${code}`, code, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
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
export async function sign(params: SignForm): Promise<null> {
  return instance.post('/api/user/join', params)
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
