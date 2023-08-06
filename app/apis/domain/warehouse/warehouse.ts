import { withAuth } from '@/app/apis/config/axios/withAuth'
import { Response } from '@/app/apis/types/response/response'
import { ItemInfo, ItemParams, OmitStorageIdItemInfo, Storage } from '@/app/apis/types/domain/warehouse/warehouse'

// 창고 정보
export interface StorageParam {
  // 이름
  name: string
  // 이미지 url
  imgUrl: string
  // 설명
  description: string
  // 주소
  address: string
  // 좌표값 X
  longitude: number
  // 좌표값 Y
  latitude: number
}

// 창고 수정
export interface ModifyStorageParam {
  itemId: string
  storageIdList: number[]
}

export interface NearbyStorageParam {
  // 경도
  lon: string
  // 위도
  lat: string
  // 반경
  rad: string
  // 조회수
  limit: string
  // 페이징
  page: string
}

/**
 * 아이템 조회
 *
 * @param itemId // 아이템 id
 */
export async function itemInfo(itemId: string | null): Promise<Response<{ item: ItemInfo }>> {
  return withAuth.get(`/api/item/${itemId}`)
}

/**
 * 아이템 등록
 *
 * @param params.name // 이름
 * @param params.description // 설명
 * @param params.imgUrl // 이미지 url
 * @param params.type // 타입
 * @param params.category // 카테고리
 * @param params.storageIdList[] // 창고 id
 *
 * @params params
 */
// todo: response 201 테스트
export async function saveItem(params: ItemParams): Promise<Response<null>> {
  return withAuth.post('/api/item', params)
}

/**
 * 아이템 수정
 *
 * @param itemId // 아이템 id
 * @param params.name // 이름
 * @param params.description // 설명
 * @param params.imgUrl // 이미지 url
 * @param params.type // 타입
 * @param params.category // 카테고리
 *
 * @param params
 */
export async function modifyItem(itemId: string, params: OmitStorageIdItemInfo): Promise<Response<{ item: ItemInfo }>> {
  const newParams = {
    ...params,
    itemId,
  }
  return withAuth.put(`/api/item/${itemId}`, newParams)
}

/**
 * 아이템 창고 수정
 *
 * @param params.itemId // 아이템 id
 * @param params.storageIdList[] // 창고 id
 *
 * @param params
 */
export async function modifyStorage(params: ModifyStorageParam): Promise<null> {
  return withAuth.put(`/api/item/connect/${params.itemId}`)
}

/**
 * 창고 조회(요청 유저)
 *
 */
export async function storageInfo(): Promise<Response<{ storage: Storage }>> {
  return withAuth.get('/api/storage')
}

/**
 * 창고 조회(근처)
 *
 */
export async function nearbyStorage(params: NearbyStorageParam): Promise<Response<{ content: Storage[] }>> {
  return withAuth.get('/api/storage/nearby')
}

/**
 * 창고 등록
 *
 * @param params.name // 이름
 * @param params.imgUrl // 이미지 url
 * @param params.description // 설명
 * @param params.address // 주소
 * @param params.longitude // 좌표값 X
 * @param params.latitude // 좌표값 Y
 *
 * @params params
 */
export async function saveStorage(params: StorageParam): Promise<Response<null>> {
  return withAuth.post('/api/storage', params)
}

/**
 * 창고 조회
 *
 */
export async function storage(storage: string): Promise<Response<{ data: StorageParam }>> {
  return withAuth.get(`/api/storage/${storage}`)
}
