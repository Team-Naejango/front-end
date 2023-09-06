import { withAuth } from '@/app/apis/config/axios/instance/withAuth'
import { Response } from '@/app/apis/types/response/response'
import {
  ItemInfo,
  ItemList,
  ItemParams,
  OmitStorageIdItemInfo,
  StorageGroupChat,
  StorageInfo,
} from '@/app/apis/types/domain/warehouse/warehouse'

// 창고 정보
export interface StorageParam {
  // 이름
  name: string
  // 이미지 url
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
export interface ModifyStorageParam {
  itemId: string | null
  storageIdList: number[] | undefined
}

/* ************************************ 창고 엔터티 ************************************ */

/**
 * 창고 조회
 *
 */
export async function storage(): Promise<Response<{ data: StorageInfo }>> {
  return withAuth.get('/api/storage')
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
export async function saveStorage(params: StorageParam): Promise<Response> {
  return withAuth.post('/api/storage', params)
}

/**
 * 창고 아이템 조회
 *
 * */
export async function storageItem(params: {
  storageId: string
  status: boolean
  page: string
  size: string
}): Promise<Response<{ data: ItemList }>> {
  return withAuth.get(`/api/storage/${params.storageId}/items`, { params })
}

/**
 * 창고 삭제
 *
 */
export async function deleteStorage(storageId: string): Promise<Response<null>> {
  return withAuth.delete(`/api/storage/${storageId}`)
}

/**
 * 창고 수정
 *
 * @param params.name // 이름
 * @param params.imgUrl  // 이미지 url
 * @param params.description // 설명
 *
 */
export async function modifyStorage(params: {
  name: string
  imgUrl: string
  description: string
  storageId: string
}): Promise<Response<null>> {
  return withAuth.patch(`/api/storage/${params.storageId}`, params)
}

/**
 * 창고 그룹 채널 조회
 *
 * @param storageId // 창고 id
 * */
export async function storageGroupChannel(storageId: string): Promise<Response<{ data: StorageGroupChat }>> {
  return withAuth.get(`/api/storage/${storageId}/channel`)
}

/* ************************************ 아이템 엔터티 ************************************ */

/**
 * 아이템 조회
 *
 * @param itemId // 아이템 id
 */
export async function itemInfo(itemId: string | null): Promise<Response<{ data: ItemInfo }>> {
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
  return withAuth.patch(`/api/item/${itemId}`, newParams)
}

/**
 * 아이템 창고 수정
 *
 * @param params.itemId // 아이템 id
 * @param params.storageIdList[] // 창고 id
 *
 * @param params
 */
export async function modifyStorageItem(params: ModifyStorageParam): Promise<null> {
  return withAuth.patch(`/api/item/connect/${params.itemId}`, params)
}
