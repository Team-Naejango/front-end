/* ******************************** 창고 ******************************** */

export type SearchResult = {
  // 창고 ID
  storageId: string
  // 창고 소유자 ID
  ownerId: string
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

/**
 * 근처 창고 정보
 */
export interface Storage {
  message: string
  searchResult: SearchResult[]
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
  // 아이템 타입(INDIVIDUAL_BUY / INDIVIDUAL_BUY / GROUP_BUY)
  itemType: string
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
  // 창고 그룹 정보
  channelInfo: ChannelInfo
  // 조회 결과 메세지
  message: string
}

/* ******************************** 아이템 ******************************** */

/**
 * 아이템 생성
 */
export interface ItemParams {
  // 아이템 이름
  name: string
  // 아이템 설명
  description: string
  // 이미지 URL
  imgUrl: string
  // 타입
  itemType: string
  // 카테고리
  category: string
  // 창고 리스트
  storageId: number
}

/**
 * 아이템 정보
 */
export type OmitStorageIdItemInfo = Omit<ItemParams, 'storageId'>
export interface ItemInfo extends OmitStorageIdItemInfo {
  // 아이템 ID
  id: string
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

export interface ItemSearchInfo {
  message: string
  searchResult: SearchCondition[]
}
