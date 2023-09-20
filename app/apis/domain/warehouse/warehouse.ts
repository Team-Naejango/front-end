import { withAuth } from '@/app/apis/config/axios/instance/withAuth'
import { Response } from '@/app/apis/types/response/response'
import {
  ItemInfo,
  ItemList,
  ItemParams,
  ItemSearchInfo,
  OmitStorageIdItemInfo,
  SaveItem,
  StorageGroupChat,
  StorageInfo,
} from '@/app/apis/types/domain/warehouse/warehouse'

/* ************************************ 창고 엔터티 ************************************ */

// 창고 정보
export interface StorageParam {
  // 이름
  name: string
  // 이미지 URL
  imgUrl: string
  // 설명
  description: string
  // 주소
  address?: string
  // 좌표값 X, Y
  coord: {
    longitude: number | null
    latitude: number | null
  }

  // TEMP
  storageId?: string
}

// 창고 수정
export interface ModifyParam {
  // 이름
  name: string
  // 이미지 URL
  imgUrl: string
  // 설명
  description: string
  // 창고 ID
  storageId: string
}

// 창고 아이템 조회
export interface StorageItemParam {
  // 창고 ID
  storageId: string
  // 아이템 상태 (true=거래중, false=거래완료)
  status: boolean
  // 요청 페이지
  page: string
  // 페이지 당 결과 수
  size: string
}

/**
 * 창고 조회
 *
 */
export async function storage(): Promise<Response<{ data: StorageInfo }>> {
  return withAuth.get('/api/storage')
}

/**
 * 특정 창고 아이템 조회
 *
 * @param params.storageId // 창고 ID
 * @param params.status // 아이템 상태 (true=거래중, false=거래완료)
 * @param params.page // 요청 페이지
 * @param params.size // 페이지 당 결과 수
 * */
export async function storageItem(params: StorageItemParam): Promise<Response<{ data: ItemList }>> {
  return withAuth.get(`/api/storage/${params.storageId}/items`, { params })
}

/**
 * 창고 그룹 채널 조회
 *
 * @param itemId // 공동 구매 아이템 ID
 * */
export async function storageGroupChannel(itemId: string): Promise<Response<{ data: StorageGroupChat }>> {
  return withAuth.get(`/api/item/${itemId}/channel`)
}

/**
 * 창고 등록
 *
 * @param params.name // 이름
 * @param params.imgUrl // 이미지 URL
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
 * 창고 수정
 *
 * @param params.name // 이름
 * @param params.imgUrl  // 이미지 URL
 * @param params.description // 설명
 *
 */
export async function modifyStorage(params: ModifyParam): Promise<Response<null>> {
  return withAuth.patch(`/api/storage/${params.storageId}`, params)
}

/**
 * 창고 삭제
 *
 */
export async function deleteStorage(storageId: string): Promise<Response<null>> {
  return withAuth.delete(`/api/storage/${storageId}`)
}

/* ************************************ 아이템 엔터티 ************************************ */

export interface ItemSearchParam {
  // 경도
  lon: string
  // 위도
  lat: string
  // 반경
  rad: string
  // 페이징
  page: string
  // 조회수
  size: string
  // 카테고리 이름
  category: string
  // 검색 키워드(2~10자)
  keyword: string
  // 타입 (INDIVIDUAL_BUY/ INDIVIDUAL_SELL/ GROUP_BUY)
  itemType: string
  // 상태 (거래중:true/거래완료:false)
  status: boolean
}

// 아이템 창고 수정
// export interface ModifyStorageParam {
//   // 아이템 ID
//   itemId: string | null
//   // 창고 ID 리스트
//   storageIdList: number[] | undefined
// }

/**
 * 아이템 조회
 *
 * @param itemId // 아이템 ID
 */
export async function itemInfo(itemId: string | null): Promise<Response<{ data: ItemInfo }>> {
  return withAuth.get(`/api/item/${itemId}`)
}

/**
 * 아이템 검색
 *
 * @param params
 */
export async function itemSearch(params: ItemSearchParam): Promise<Response<{ data: ItemSearchInfo }>> {
  return withAuth.get('/api/item/search', { params })
}

/**
 * 아이템 등록
 *
 * @param params.name // 이름
 * @param params.description // 설명
 * @param params.imgUrl // 이미지 URL
 * @param params.itemType // 타입
 * @param params.category // 카테고리
 * @param params.storageId // 창고 ID
 *
 * @params params
 */
export async function saveItem(params: ItemParams): Promise<Response<{ data: SaveItem }>> {
  return withAuth.post('/api/item', params)
}

/**
 * 아이템 수정
 *
 * @param itemId // 아이템 ID
 * @param params.name // 이름
 * @param params.description // 설명
 * @param params.imgUrl // 이미지 URL
 * @param params.itemType // 타입
 * @param params.category // 카테고리
 *
 * @param params
 */
export async function modifyItem(itemId: string, params: OmitStorageIdItemInfo): Promise<Response<{ data: ItemInfo }>> {
  const newParams = {
    ...params,
    itemId,
  }
  return withAuth.patch(`/api/item/${itemId}`, newParams)
}

// /**
//  * 아이템 창고 수정
//  *
//  * @param params.itemId // 아이템 ID
//  * @param params.storageIdList[] // 창고 ID 리스트
//  *
//  * @param params
//  */
// export async function modifyStorageItem(params: ModifyStorageParam): Promise<null> {
//   return withAuth.patch(`/api/item/connect/${params.itemId}`, params)
// }
