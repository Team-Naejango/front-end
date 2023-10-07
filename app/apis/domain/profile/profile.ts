import { withAuth } from '@/app/apis/config/axios/instance/withAuth'
import { Common, Response } from '@/app/apis/types/response/response'
import { AnotherMemberInfo, Member, MemberInfo } from '@/app/apis/types/domain/profile/profile'

/**
 * 유저정보 조회
 *
 */
export async function userInfo(): Promise<Response<{ data: MemberInfo }>> {
  return withAuth.get('/api/user/profile')
}

/**
 * 다른 유저정보 조회
 *
 */
export async function anotherUserInfo(userId: string): Promise<Response<{ data: AnotherMemberInfo }>> {
  return withAuth.get(`/api/user/profile/${userId}`)
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
export async function modifyUserInfo(params: Member): Promise<Response<{ user: MemberInfo }>> {
  return withAuth.patch('/api/user/profile', params)
}

/**
 * 유저 삭제
 *
 */
export async function deleteUser(): Promise<Response<Common>> {
  return withAuth.delete('/api/user')
}
