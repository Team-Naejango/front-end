import { withAuth } from '@/app/apis/config/axios/instance/withAuth'
import { Response } from '@/app/apis/types/response/response'
import { Deal, Transaction } from '@/app/apis/types/domain/chat/deal'

export interface DealParam {
  // 금액
  date: string
  // 날짜
  amount: number
  // 교환상대 id
  traderId: number
  // 아이템 Id
  itemId: number
}

type ModifyParam = Omit<DealParam, 'traderId' | 'itemId'> & { transactionId?: string }

/**
 * 거래 내역 조회
 *
 */
export async function deal(): Promise<Response<{ data: Transaction[] }>> {
  return withAuth.get('/api/transaction')
}

/**
 * 거래 등록
 *
 * @param params.date // 거래 id
 * @param params.amount // 날짜
 * @param params.traderId // 교환상대 id
 * @param params.itemId // 아이템 id
 *
 * @param params
 */
export async function saveDeal(params: DealParam): Promise<Response<{ data: Deal }>> {
  return withAuth.post('/api/transaction', { params })
}

/**
 * 거래 정보 수정
 *
 * @param params.date // 날짜
 * @param params.amount // 금액
 * @param params.transactionId // 거래 id
 *
 * @param params
 */
export async function modifyDeal(params: ModifyParam): Promise<Response<{ data: ModifyParam }>> {
  return withAuth.patch(`/api/transaction/${params.transactionId}`, { params })
}

/**
 * 거래 삭제
 *
 * @param transactionId // 거래 id
 */
export async function deleteDeal(transactionId: string): Promise<Response<null>> {
  return withAuth.delete(`/api/transaction/${transactionId}`)
}

/**
 * 거래 완료 요청
 *
 * @param transactionId // 거래 id
 */
export async function complete(transactionId: string): Promise<Response<null>> {
  return withAuth.patch(`/api/transaction/completion/${transactionId}`)
}

/**
 * 송금 완료 요청
 *
 * @param transactionId // 거래 id
 */
export async function wire(transactionId: string): Promise<Response<null>> {
  return withAuth.patch(`/api/transaction/remittance/${transactionId}`)
}
