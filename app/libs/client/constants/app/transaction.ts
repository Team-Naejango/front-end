/**
 * 거래 절차별 메세지 수신
 */
export const TRANSACTION_MESSAGE = {
  예약등록: '거래 예약 등록 성공',
} as const

export type E_TRANSACTION_MESSAGE = (typeof TRANSACTION_MESSAGE)[keyof typeof TRANSACTION_MESSAGE]
