import { instance } from '@/app/apis/config/axios/instance'
import { AuthToken, MemberInfo } from '@/app/apis/types/domain/auth/auth'
// import { Response } from '@/app/apis/types/response/response'

/**
 * 회원가입
 *
 * @param params.birth // 생년월일
 * @param params.gender  // 성별
 * @param params.nickname // 닉네임
 * @param params.intro // 소개
 * @param params.phoneNumber // 폰번호
 * @param params.imgUrl / 이미지 링크
 *
 * @param params
 */
export async function sign(params: MemberInfo): Promise<Response> {
  return instance.post('/api/user/profile', params)
}

/**
 * 비회원 로그인
 *
 */
export async function nonUser(): Promise<Response> {
  return instance.get('/api/auth/guest')
}

/**
 * 비회원 로그인
 *
 */
export async function non(): Promise<Response> {
  return instance.get('/')
}

/**
 * 닉네임 중복확인
 *
 * @param username 닉네임
 */
export async function nickNameValidity(username: string): Promise<Response> {
  return instance.get(`/api/user/check/${username}`)
}

/**
 * 토큰 재발급
 *
 * @param params.refreshToken 리프래시 토큰
 */
export async function refresh(params: { refreshToken: string }): Promise<Response> {
  return instance.post('/', params)
}
