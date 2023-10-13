import { withAuth } from '@/app/apis/config/axios/instance/withAuth'
import { Response } from '@/app/apis/types/response/response'
import { Storage } from '@/app/apis/types/domain/warehouse/warehouse'

export interface NearbyStorageParam {
  // 경도
  lon: string
  // 위도
  lat: string
  // 반경
  rad?: string
  // 페이징
  page?: string
  // 조회수
  size?: string
}

/**
 * 근처 창고 조회
 *
 */
export async function nearbyStorage(params: NearbyStorageParam): Promise<Response<{ data: Storage }>> {
  return withAuth.get('/api/storage/nearby', { params })
}
