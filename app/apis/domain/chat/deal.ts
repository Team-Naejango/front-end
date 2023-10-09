import { withAuth } from '@/app/apis/config/axios/instance/withAuth'
import { Common, Response } from '@/app/apis/types/response/response'
import { Deal, IncompleteTransaction, SearchTransaction, Transaction } from '@/app/apis/types/domain/chat/deal'

export interface DealParam {
  // 날짜
  date: string
  // 금액
  amount: number
  // 거래자 ID
  traderId: number
  // 아이템 ID
  itemId: number
}

export type ModifyParam = Omit<DealParam, 'traderId' | 'itemId'> & { transactionId?: string }

type ModifyResponse = {
  message: string
  result: {
    // 날짜
    date: string
    // 금액
    amount: number
  }
}

/**
 * 거래 내역 조회
 *
 */
export async function deal(): Promise<Response<{ data: Transaction }>> {
  return withAuth.get('/api/transaction')
}

/**
 * 특정 거래 정보 조회
 *
 * @param transactionId // 거래 ID
 */
export async function searchDeal(transactionId: string): Promise<Response<{ data: SearchTransaction }>> {
  return withAuth.get(`/api/transaction/${transactionId}`)
}

/**
 * 상대 유저와 완료되지 않은 거래 조회(미완료 거래)
 *
 * @param traderId // 상대 유저 ID
 */
export async function incompleteDeal(traderId: string): Promise<Response<{ data: IncompleteTransaction }>> {
  return withAuth.get(`/api/transaction/trader/${traderId}`)
}

/**
 * 거래 등록
 *
 * @param params.date // 거래 날짜 및 시간
 * @param params.amount // 거래 금액
 * @param params.traderId // 거래자 ID
 * @param params.itemId // 아이템 ID
 *
 * @param params
 */
export async function saveDeal(params: DealParam): Promise<Response<{ data: Deal }>> {
  return withAuth.post('/api/transaction', params)
}

/**
 * 거래 정보 수정
 *
 * @param params.date // 날짜
 * @param params.amount // 금액
 * @param params.transactionId // 거래 ID
 *
 * @param params
 */
export async function modifyDeal(params: ModifyParam): Promise<Response<{ data: ModifyResponse }>> {
  return withAuth.patch(`/api/transaction/${params.transactionId}`, params)
}

/**
 * 거래 삭제
 *
 * @param transactionId // 거래 ID
 */
export async function deleteDeal(transactionId: string): Promise<Response<{ data: Common }>> {
  return withAuth.delete(`/api/transaction/${transactionId}`)
}

/**
 * 거래 완료 요청
 *
 * @param transactionId // 거래 ID
 */
export async function complete(transactionId: string): Promise<Response<{ data: Common }>> {
  return withAuth.patch(`/api/transaction/${transactionId}/complete`)
}

/**
 * 송금 완료 요청
 *
 * @param transactionId // 거래 ID
 */
export async function wire(transactionId: string): Promise<Response<{ data: Common }>> {
  return withAuth.patch(`/api/transaction/${transactionId}/remit`)
}
