import { withAuth } from '@/app/apis/config/axios/withAuth'
import { Response } from '@/app/apis/types/response/response'
import { MemberInfo } from '@/app/apis/types/domain/auth/auth'

/**
 * 유저정보 조회
 *
 */
export async function userInfo(): Promise<Response<{ data: MemberInfo }>> {
  return withAuth.get('/api/user/profile')
}

/**
 * 유저정보 수정
 *
 * @param params.nickname
 * @param params.intro
 * @param params.imgUrl
 *
 */
export async function modifyUserInfo(params: MemberInfo): Promise<Response<{ data: MemberInfo }>> {
  return withAuth.patch('/api/user/profile', params)
}

/**
 * 유저 삭제
 *
 */
export async function deleteUser(): Promise<Response<null>> {
  return withAuth.delete('/api/user/profile')
}
