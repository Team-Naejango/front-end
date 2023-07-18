import { instance } from '@/app/apis/config/axios/instance'
import { AuthToken, KakaoLoginToken, LoginInfo } from '@/app/apis/types/domain/auth/auth'
import { Response } from '@/app/apis/types/response/response'
import { SignParams } from '@/app/apis/domain/profile/profile'

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
 * 유저 회원가입
 *
 * @param params.age
 * @param params.gender
 * @param params.nickname
 * @param params.intro
 * @param params.phoneNumber
 * @param params.imgUrl
 *
 * @param accessToken
 * @param params
 */
export async function sign(accessToken: string | null, params: SignParams): Promise<Response<null>> {
  return instance.post('/api/user/profile', params, {
    headers: { Authorization: accessToken },
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
