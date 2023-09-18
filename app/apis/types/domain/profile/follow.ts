export type FollowResult = {
  // id
  id: number
  // 창고 이름
  name: string
  // 창고 설명
  description: string
  // 창고 url
  imgUrl: string
}

/**
 * 팔로우 정보
 */
export interface Follows {
  message: string
  result: FollowResult[]
}
