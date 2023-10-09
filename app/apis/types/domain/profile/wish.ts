import { E_ITEM_TYPE } from '@/app/libs/client/constants/code'

export type WishResult = {
  // 아이템 ID
  id: number
  // 아이템 이름
  name: string
  // 아이템 설명
  description: string
  // 이미지 url
  imgUrl: string
  // 타입
  itemType: E_ITEM_TYPE
  // 카테고리 ID
  categoryId: number
  // 카테고리
  category: string
}

/**
 * 관심목록 정보
 */
export interface Wishs {
  message: string
  result: WishResult[]
}
