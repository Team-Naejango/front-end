import { E_TRANSACTION_TYPE } from '@/app/libs/client/constants/code'

export type TransactionResult = {
  // 거레 edit
  id: number
  // 거래 금액
  amount: number
  // 거래 날짜 및 시간
  date: string
  // 거래 상태(구매/판매)
  status: string
  // 거래자 이름
  traderName: string
  // 아이템 이름
  itemName: string
  // 아이템 edit
  itemId: number
}

/**
 * 거래 정보
 */
export interface Transaction {
  message: string
  result: TransactionResult[]
}

/**
 * 특정 거래 정보
 */
export interface SearchTransaction {
  message: string
  result: TransactionResult
}

export type DealResult = {
  // 거래 edit
  id?: number
  // 거래 날짜 및 시간
  date: string
  // 거래 금액
  amount: number
  // 거래 상태
  status?: string
  // 유저 edit
  userId?: number
  // 교환 상대 edit
  traderId: number
  // 아이템 Id
  itemId: number
}

/**
 * 거래 등록
 */
export interface Deal {
  message: string
  result: DealResult
}

export type IncompleteResult = {
  id: number
  date: string
  amount: number
  status: E_TRANSACTION_TYPE
}

/**
 * 미완료 거래 정보
 */
export interface IncompleteTransaction {
  message: string
  result: IncompleteResult[]
}
