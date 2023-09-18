export type WishResult = {
  // seq
  id: number
  // 아이템 이름
  name: string
  // 아이템 설명
  description: string
  // 이미지 url
  imgUrl: string
  // 타입
  itemType: string
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
