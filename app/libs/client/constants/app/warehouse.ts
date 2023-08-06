/**
 * 위치 절차
 */
export const STEP = {
  위치정보: '위치정보',
  위치선택: '위치선택',
} as const

export type E_STEP = (typeof STEP)[keyof typeof STEP]
