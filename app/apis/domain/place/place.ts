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
 * @param params.lon // 경도
 * @param params.lat // 위도
 * @param params.rad // 반경
 * @param params.page // 페이징
 * @param params.size // 조회수
 */
export async function nearbyStorage(params: NearbyStorageParam): Promise<Response<{ data: Storage }>> {
  return withAuth.get('/api/storage/nearby', { params })
}
