/* ******************************** 창고 ******************************** */

export type SearchingCondition = {
  // 카테고리
  cat: {
    id: number
    name: string
  }
  // 검색 키워드
  keyword: string[]
  itemType: string
  status: boolean
}

export type SearchResult = {
  storageId: string
  name: string
  imgUrl: string
  address: string
  coord: {
    longitude: number | null
    latitude: number | null
  }
  distance: number
  description: string
}

/**
 * 근처 창고 정보
 */
export interface Storage {
  coord: {
    longitude: number
    latitude: number
  }
  // 반경
  radius: number
  page: number
  size: number
  message: string
  // 검색 조건
  searchingConditions: SearchingCondition
  // 검색 결과
  searchResult: SearchResult[]
}

export type Storages = {
  id: number
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
  // 아이템 ID
  itemId: number
  // 아이템 카테고리
  category: string
  // 아이템 타입(BUY/SELL)
  type: string
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
  // 요청한 페이지
  page: number
  // 페이지당 결과물 수
  size: number
  // 조회 결과 메세지
  message: string
  // 창고의 유저 ID
  userId: number
  // 아이템 정보
  itemList: Item[]
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
  // 아이템 ID
  id: string
}
