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
  // 창고 리스트
  storageIdList: number[]
}

/**
 * 아이템 정보
 */
export type OmitStorageIdItemInfo = Omit<ItemParams, 'storageIdList'>
export interface ItemInfo extends OmitStorageIdItemInfo {
  // 아이템 id
  id: string
}

/**
 * 창고 정보
 */
export interface Storage {
  id: number
  name: string
  imgUrl: string
  description: string
  address: string
  coord?: {
    longitude: number
    latitude: number
  }
  distance?: number
  // // 창고 리스트
  // storageList: number[]
  // // 창고 번호
  // count: number
  // // 이름
  // name: string
  // // 이미지 url
  // imgUrl: string
  // // 설명
  // description: string
  // // 주소
  // address: string
  // // 좌표값 X
  // longitude: number
  // // 좌표값 Y
  // latitude: number
}

export type Info = {
  address: string
  description: string
  id: number
  imgUrl: string
  name: string
}

export interface StorageInfo {
  count: number
  storageList: Info[]
}

export type Item = {
  itemId: number
  category: null
  name: string
  imgUrl: string
}

export interface ItemList {
  itemList: Item[]
}
