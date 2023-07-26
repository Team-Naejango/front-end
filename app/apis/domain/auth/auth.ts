import { instance } from '@/app/apis/config/axios/instance'
import { AuthToken, MemberInfo } from '@/app/apis/types/domain/auth/auth'
import { Response } from '@/app/apis/types/response/response'

/**
 * 유저 회원가입
 *
 * @param params.age
 *
 * @param accessToken
 * @param params
 */
export async function sign(accessToken: string, params: MemberInfo): Promise<Response<null>> {
  return instance.post('/api/user/profile', params, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
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
