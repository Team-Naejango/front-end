import { instance } from '@/app/apis/config/axios/instance/instance'
import { withAuth } from '@/app/apis/config/axios/instance/withAuth'
import { Common, Response } from '@/app/apis/types/response/response'
import { NewAccessToken } from '@/app/apis/types/domain/auth/auth'

export interface SignParam {
  // 생년월일
  birth: string
  // 성별(남/여)
  gender: string
  // 닉네임
  nickname: string
  // 소개글
  intro: string
  // 전화번호
  phoneNumber: string
  // 이미지 링크
  imgUrl: string
}

/**
 * 회원가입
 *
 * @param params.birth // 생년월일
 * @param params.gender // 성별
 * @param params.nickname // 닉네임
 * @param params.intro // 소개
 * @param params.phoneNumber // 전화번호
 * @param params.imgUrl // 이미지 링크
 *
 * @param accessToken // 액세스 토큰
 * @param params
 */
export async function sign(params: SignParam, accessToken: string): Promise<Response<null>> {
  return instance.post('/api/user/profile', params, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

/**
 * 게스트 로그인
 *
 */
export async function nonUser(): Promise<Response<{ data: Common }>> {
  return instance.get('/api/auth/guest')
}

/**
 * 공용 로그인
 *
 */
export async function commonUser(): Promise<Response<{ data: Common }>> {
  return instance.get('/api/auth/common-user')
}

/**
 * 로그아웃
 *
 */
export async function logout(): Promise<Response<null>> {
  return withAuth.get('/api/auth/logout')
}

/**
 * 토큰 재발급
 *
 */
export async function refresh(): Promise<Response<{ data: NewAccessToken }>> {
  return instance.get('/api/auth/refresh')
}

/**
 * 닉네임 중복확인
 *
 * @param username 닉네임
 */
export async function nickNameValidity(username: string): Promise<Response<boolean>> {
  return instance.get(`/api/user/check/${username}`)
}
