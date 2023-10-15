import { withAuth } from '@/app/apis/config/axios/instance/withAuth'
import { Response } from '@/app/apis/types/response/response'

/**
 * 계좌 잔고 충전
 *
 * @param amount // 잔고
 */
export async function account(amount: number): Promise<Response<null>> {
  return withAuth.patch('/api/account', { amount })
}
