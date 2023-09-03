import { Paging } from '@/app/apis/types/response/response'

/* ******************************** 아이템 ******************************** */

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

/* ******************************** 창고 ******************************** */

export type Storage = Paging & {
  content: [
    {
      id: number
      // 이름
      name: string
      // 이미지 url
      imgUrl: string
      // 설명
      description: string
      // 주소
      address: string
      // 좌표
      coord: {
        longitude: number | null
        latitude: number | null
      }
      distance?: number
    }
  ]
}

export type Storages = {
  id: number
  // 이름
  name: string
  // 이미지 url
  imgUrl: string
  // 설명
  description: string
  // 주소
  address: string
  // 좌표
  coord: {
    longitude: number | null
    latitude: number | null
  }
  distance?: number
}

/**
 * 창고 정보
 */
export interface StorageInfo {
  count: number
  storageList: Storages[]
}

export type Item = {
  itemId: number
  category: string
  type: string
  name: string
  imgUrl: string
  description: string
}

/**
 * 창고 아이템 정보
 */
export interface ItemList {
  page: number
  size: number
  result: number
  itemList: Item[]
}
