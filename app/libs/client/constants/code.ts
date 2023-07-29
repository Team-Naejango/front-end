/**
 * API 결과 코드
 */
export const API_RESULT = {
  성공: true,
  실패: false,
} as const

type E_API_RESULT = (typeof API_RESULT)[keyof typeof API_RESULT]

/**
 * FLAG
 */
export const FLAG = {
  TRUE: 1,
  FALSE: 0,
} as const

export type E_FLAG = (typeof FLAG)[keyof typeof FLAG]

/**
 * CRUD
 */
export const CRUD = {
  등록: 'C',
  목록: 'R',
  수정: 'U',
  삭제: 'D',
} as const

export type E_CRUD = (typeof CRUD)[keyof typeof CRUD]

/**
 * 모달 타입
 */
export const MODAL_TYPES = {
  ALERT: 'alert',
  DIALOG: 'dialog',
  CONFIRM: 'confirm',
} as const

export type E_MODAL_TYPES = (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES]

/**
 * 스위치
 */
export const SWITCH_STATUS = {
  온: 'ON',
  오프: 'OFF',
} as const

export type E_SWITCH_STATUS = (typeof SWITCH_STATUS)[keyof typeof SWITCH_STATUS]
