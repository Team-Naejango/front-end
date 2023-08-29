import { withAuth } from '@/app/apis/config/axios/instance/withAuth'
import { Response } from '@/app/apis/types/response/response'
import { MemberInfo } from '@/app/apis/types/domain/auth/auth'

/**
 * 유저정보 조회
 *
 */
export async function userInfo(): Promise<MemberInfo> {
  return withAuth.get('/api/user/profile')
}

/**
 * 유저정보 수정
 *
 * @param params.birth // 생년월일
 * @param params.gender  // 성별
 * @param params.nickname // 닉네임
 * @param params.intro // 소개
 * @param params.phoneNumber // 폰번호
 * @param params.imgUrl / 이미지 링크
 *
 */
export async function modifyUserInfo(params: MemberInfo): Promise<Response<{ user: MemberInfo }>> {
  return withAuth.patch('/api/user/profile', params)
}

/**
 * 유저 삭제
 *
 */
export async function deleteUser(): Promise<Response<null>> {
  return withAuth.delete('/api/user/profile')
}

/**
 * 더미 API
 *
 */
export async function getUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = (await res.json()) as any[]
  return users
}
