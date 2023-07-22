import { withAuth } from '@/app/apis/config/axios/withAuth'
import { Response } from '@/app/apis/types/response/response'
import { MemberInfo } from '@/app/apis/types/domain/auth/auth'

export interface SignParams {
  // 생년월일
  age?: number
  // 성별
  gender: string
  // 닉네임
  nickname: string
  // 소개
  intro: string
  // 폰번호
  phoneNumber: string
  // 이미지 링크
  imgUrl: string
}

/**
 * 유저정보 조회
 *
 */
export async function userInfo(accessToken: string | null): Promise<Response<{ data: MemberInfo }>> {
  return withAuth.get('/api/user/profile', {
    headers: { Authorization: accessToken },
  })
}

/**
 * 유저정보 수정
 *
 * @param params.nickname
 * @param params.intro
 * @param params.imgUrl
 *
 */
export async function modifyUserInfo(params: {
  nickname: string
  intro: string
  imgUrl: string
}): Promise<Response<{ data: MemberInfo }>> {
  return withAuth.patch('/api/user/profile', params)
}

/**
 * 유저 삭제
 *
 */
export async function deleteUser(): Promise<Response<null>> {
  return withAuth.delete('/api/user/profile')
}
