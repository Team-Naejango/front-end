import { withAuth } from '@/app/apis/config/axios/instance/withAuth'
import { Response } from '@/app/apis/types/response/response'
import { Categories } from '@/app/apis/types/domain/place/category'

/**
 * 카테고리 조회
 *
 */
export async function category(): Promise<Response<{ data: Categories }>> {
  return withAuth.get('/api/category')
}
