/**
 * 아이템 생성
 */
export interface ItemParams {
  // 아이템 이름
  name: string
  // 아이템 설명
  description: string
  // 이미지 url
  imgUrl: string
  // 타입
  type: string
  // 카테고리
  category: string
  // 창고 id
  storageIdList: number[]
}

/**
 * 아이템 조회
 */
export type OmitStorageIdItemInfo = Omit<ItemParams, 'storageIdList'>
export interface ItemInfo extends OmitStorageIdItemInfo {
  // 아이템 id
  id: string
}
