import { withAuth } from '@/app/apis/config/axios/instance/withAuth'
import { Response } from '@/app/apis/types/response/response'
import { Wishs } from '@/app/apis/types/domain/profile/wish'

/**
 * 관심 조회
 *
 */
export async function wish(): Promise<Response<{ wish: Wishs[] }>> {
  return withAuth.get('/api/wish')
}

/**
 * 관심 등록
 *
 */
export async function saveWish(itemId: string): Promise<Response<null>> {
  return withAuth.post(`/api/wish/${itemId}`)
}

/**
 * 관심 취소
 *
 */
export async function unWish(itemId: string): Promise<Response<null>> {
  return withAuth.delete(`/api/wish/${itemId}`)
}
