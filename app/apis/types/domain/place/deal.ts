/**
 * 거래 정보
 */
export interface Transaction {
  // id
  id: number
  // 날짜
  amount: number
  // 금액
  date: string
  // 상태
  status: string
  // 거래자 이름
  traderName: string
  // 아이템 이름
  itemName: string
  // 아이템 id
  itemId: number
}

/**
 * 거래 등록
 */
export interface Deal {
  // id
  id?: number
  // 금액
  date: string
  // 날짜
  amount: number
  // 상태
  status?: string
  // 유저 id
  userId?: number
  // 교환 상대 id
  traderId: number
  // 아이템 Id
  itemId: number
}
