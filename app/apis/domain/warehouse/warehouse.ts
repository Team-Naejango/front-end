import { withAuth } from '@/app/apis/config/axios/withAuth'
import { Response } from '@/app/apis/types/response/response'
import { ItemInfo, ItemParams, OmitStorageIdItemInfo } from '@/app/apis/types/domain/warehouse/warehouse'

export interface StorageParam {
  itemId: string
  storageIdList: number[]
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
export async function save(params: ItemParams): Promise<Response<null>> {
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
export async function modify(itemId: string, params: OmitStorageIdItemInfo): Promise<Response<{ item: ItemInfo }>> {
  const newParams = {
    ...params,
    itemId,
  }
  return withAuth.put(`/api/item/${itemId}`, newParams)
}

/**
 * 창고 수정
 *
 * @param params.itemId // 아이템 id
 * @param params.storageIdList[] // 창고 id
 *
 * @param params
 */
export async function modifyStorage(params: StorageParam): Promise<null> {
  return withAuth.put(`/api/item/connect/${params.itemId}`)
}
