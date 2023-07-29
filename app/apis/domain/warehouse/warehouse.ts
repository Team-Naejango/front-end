import { withAuth } from '@/app/apis/config/axios/withAuth'
import { Response } from '@/app/apis/types/response/response'
import { ItemInfo, ItemParams } from '@/app/apis/types/domain/warehouse/warehouse'

/**
 * 아이템 조회
 *
 * @param itemId // 아이템 id
 */
export async function itemInfo(itemId: string): Promise<Response<{ item: ItemInfo }>> {
  return withAuth.get(`/api/item/${itemId}`)
}

/**
 * 아이템 생성
 *
 * @param params.name // 이름
 * @param params.description // 설명
 * @param params.imgUrl // 이미지 url
 * @param params.type // 타입
 * @param params.category // 카테고리
 * @param params.storageIdList // 창고 id
 *
 * @params params
 */
// todo: response 201 테스트
export async function createItem(params: ItemParams): Promise<Response<{ item: ItemParams }>> {
  return withAuth.post('/api/item')
}

/**
 * 아이템 수정
 *
 * @param itemId // 아이템 id
 */
export async function modifyItemInfo(itemId: string): Promise<Response<{ item: ItemInfo }>> {
  return withAuth.put(`/api/item/${itemId}`)
}

/**
 * 창고 수정
 *
 * @param itemId // 아이템 id
 */
export async function modifyStorage(itemId: string[]): Promise<null> {
  return withAuth.put(`/api/item/connect/${itemId}`)
}
