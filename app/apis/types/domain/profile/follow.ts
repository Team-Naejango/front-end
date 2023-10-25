import { E_ITEM_TYPE } from '@/app/libs/client/constants/code'

export type ItemType = {
  // 아이템 ID
  itemId: number
  // 아이템 이름
  name: string
  // 아이템 설명
  description: string
  // 아이템 이미지 URL
  imgUrl: string
  // 아이템 타입
  itemType: E_ITEM_TYPE
  // 아이템 상태
  status: boolean
}

export type FollowResult = {
  // edit
  id: number
  // 창고 이름
  name: string
  // 창고 설명
  description: string
  // 창고 url
  imgUrl: string
  // 창고 아이템 목록
  items: ItemType[]
}

/**
 * 팔로우 정보
 */
export interface Follows {
  message: string
  result: FollowResult[]
}
