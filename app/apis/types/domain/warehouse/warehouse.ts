import { E_ITEM_TYPE } from '@/app/libs/client/constants/code'

/* ******************************** 창고 ******************************** */

export type SearchResult = {
  // 창고 ID
  storageId: number
  // 창고 소유자 ID
  ownerId: number
  // 창고 이름
  name: string
  // 창고 이미지 URL
  imgUrl: string
  // 창고 주소
  address: string
  // 창고 좌표
  coord: {
    longitude: number | null
    latitude: number | null
  }
  // 좌표로부터의 거리
  distance: number
  // 창고 소개
  description: string
}
export type OmitDistanceSearch = Omit<SearchResult, 'distance'>

/**
 * 근처 창고 정보
 */
export interface Storage {
  message: string
  result: SearchResult[]
}

export type Storages = {
  // 창고 ID
  storageId: number
  // 창고 소유 회원 ID
  ownerId: number
  // 이름
  name: string
  // 이미지 URL
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
}

/**
 * 창고 정보
 */
export interface StorageInfo {
  message: string
  result: Storages[]
}

export type Item = {
  // 아이템 ID
  itemId: number
  // 아이템 소유 회원 ID
  ownerId: number
  // 아이템 카테고리
  category: string
  // 아이템 타입(INDIVIDUAL_BUY / INDIVIDUAL_SELL / GROUP_BUY)
  itemType: E_ITEM_TYPE
  // 아이템 제목
  name: string
  // 아이템 이미지 링크
  imgUrl: string
  // 아이템 설명
  description: string
}

/**
 * 창고 아이템 정보
 */
export interface ItemList {
  // 조회 결과 메세지
  message: string
  // 아이템 정보
  result: Item[]
}

/* ******************************** 창고 그룹 채널 ******************************** */

export type ChannelInfo = {
  // 채팅 ID
  channelId: number
  // 개설한 유저 ID
  ownerId: number
  // 창고 ID
  itemId: number
  // 참여한 인원
  participantsCount: number
  // 채팅방 이름
  defaultTitle: string
  // 조회된 채널
  channelLimit: number
}

/**
 * 창고 그룹 정보
 */
export interface StorageGroupChat {
  // 조회 결과 메세지
  message: string
  // 창고 그룹 정보
  result: ChannelInfo
}

/* ******************************** 아이템 ******************************** */

export type SaveItemResult = {
  // 아이템 ID
  id: number
  // 아이템 이름
  name: string
  // 아이템 설명
  description: string
  // 이미지 URL
  imgUrl: string
  // 타입 (INDIVIDUAL_BUY/ INDIVIDUAL_SELL/ GROUP_BUY)
  itemType: string
  // 해시태그
  hashTag: string[]
  // 카테고리
  category: string
}

/**
 * 아이템 생성
 */
export interface SaveItem {
  message: string
  result: SaveItemResult
}

export type ItemInfoResult = {
  // 아이템 ID
  itemId: number
  // 창고 ID
  storageId: number
  // 카테고리 ID
  categoryId: number
  // 아이템 이름
  name: string
  // 아이템 설명
  description: string
  // 이미지 URL
  imgUrl: string
  // 아이템 타입
  itemType: string
  // 해시태그
  hashTag: string[]
  // 카테고리 이름
  categoryName: string
  // 아이템 조회 수
  viewCount: number
}

/**
 * 아이템 정보
 */
export interface ItemInfo {
  message: string
  result: ItemInfoResult
}

export type ItemModifyResult = {
  // 아이템 ID
  id: number
  // 아이템 이름
  name: string
  // 아이템 설명
  description: string
  // 이미지 URL
  imgUrl: string
  // 아이템 타입
  itemType: string
  // 카테고리
  category: string
}
/**
 * 아이템 수정
 */
export interface ItemModifyInfo {
  message: string
  result: ItemModifyResult
}

export type SearchCondition = {
  // 좌표
  coord: {
    longitude: number
    latitude: number
  }
  // 창고 ID
  storageId: number
  // 창고 이름
  storageName: string
  // 거리
  distance: number
  // 아이템 ID
  id: number
  // 아이템 이름
  name: string
  // 아이템 설명
  description: string
  // 아이템 이미지 URL
  imgUrl: string
  // 아이템 타입 (INDIVIDUAL_BUY/ INDIVIDUAL_SELL/ GROUP_BUY)
  itemType: string
  // 카테고리 이름
  categoryName: string
}

/**
 * 아이템 검색
 */
export interface ItemSearchInfo {
  message: string
  result: SearchCondition[]
}

export type ItemMatchResult = {
  // 아이템 ID
  itemId: number
  // 창고 소유 회원 ID
  ownerId: number
  // 카테고리
  category: string
  // 아이템 이름
  name: string
  // 아이템 이미지 URL
  imgUrl: string
  // 아이템 타입 (INDIVIDUAL_BUY/ INDIVIDUAL_SELL/ GROUP_BUY)
  itemType: E_ITEM_TYPE
  // 아이템과의 거리
  distance: number
  // 태그
  tag: string[]
}

/**
 * 아이템 매칭
 */
export interface ItemMatchInfo {
  message: string
  result: ItemMatchResult[]
}
