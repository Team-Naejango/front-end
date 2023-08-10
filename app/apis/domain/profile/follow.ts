import { withAuth } from '@/app/apis/config/axios/withAuth'
import { Response } from '@/app/apis/types/response/response'
import { Follows } from '@/app/apis/types/domain/profile/follow'

/**
 * 팔로우 조회
 *
 */
export async function follow(): Promise<Response<{ follow: Follows[] }>> {
  return withAuth.get('/api/follow')
}

/**
 * 팔로우 등록
 *
 */
export async function saveFollow(storageId: string): Promise<Response<null>> {
  return withAuth.post(`/api/follow/${storageId}`)
}

/**
 * 팔로우 취소
 *
 */
export async function unFollow(storageId: string): Promise<Response<null>> {
  return withAuth.delete(`/api/follow/${storageId}`)
}
