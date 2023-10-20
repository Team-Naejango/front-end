/**
 * 거래 절차별 메세지 수신
 */
export const TRANSACTION_MESSAGE = {
  예약등록: '거래 예약 등록 성공',
  정보수정: '거래 정보 수정 성공',
  송금완료: '송금 요청 성공',
  거래완료: '거래 완료 요청 성공',
  거래삭제: '거래 삭제 성공',
} as const

export type E_TRANSACTION_MESSAGE = (typeof TRANSACTION_MESSAGE)[keyof typeof TRANSACTION_MESSAGE]
