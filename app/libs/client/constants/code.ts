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
 * 슬라이드 타입
 */
export const SLIDE_TYPE = {
  이전: 'PREV',
  다음: 'NEXT',
} as const

export type E_SLIDE_TYPE = (typeof SLIDE_TYPE)[keyof typeof SLIDE_TYPE]

/**
 * 스위치
 */
export const SWITCH_STATUS = {
  온: true,
  오프: false,
} as const

export type E_SWITCH_STATUS = (typeof SWITCH_STATUS)[keyof typeof SWITCH_STATUS]

/**
 * 알림 권한
 */
export const NOTIFICATION_PERMISSION = {
  기본: 'default',
  허용: 'granted',
  차단: 'denied',
  대화상자: 'prompt',
} as const

export type E_NOTIFICATION_PERMISSION = (typeof NOTIFICATION_PERMISSION)[keyof typeof NOTIFICATION_PERMISSION]

/**
 * 아이템 타입
 */
export const ITEM_TYPE = {
  개인구매: 'INDIVIDUAL_BUY',
  개인판매: 'INDIVIDUAL_SELL',
  공동구매: 'GROUP_BUY',
} as const

export type E_ITEM_TYPE = (typeof ITEM_TYPE)[keyof typeof ITEM_TYPE]

/**
 * 채팅 타입
 */
export const CHAT_TYPE = {
  개인: 'SOLO',
  그룹: 'GROUP',
} as const

export type E_CHAT_TYPE = (typeof CHAT_TYPE)[keyof typeof CHAT_TYPE]

/**
 * 남/여 타입
 */
export const GENDER_TYPE = {
  남자: '남',
  여자: '여',
} as const

export type E_GENDER_TYPE = (typeof GENDER_TYPE)[keyof typeof GENDER_TYPE]

/**
 * 메세지 타입
 */
export const MESSAGE_TYPE = {
  구독: 'SUBSCRIBE_CHANNEL',
  오픈: 'OPEN',
  거래: 'TRADE',
  입장: 'ENTER',
  퇴장: 'EXIT',
  종료: 'CLOSE',
} as const

export type E_MESSAGE_TYPE = (typeof MESSAGE_TYPE)[keyof typeof MESSAGE_TYPE]

/**
 * 거래 타입
 */
export const TRANSACTION_TYPE = {
  거래약속: 'TRANSACTION_APPOINTMENT',
  송금완료: 'REMITTANCE_COMPLETION',
} as const

export type E_TRANSACTION_TYPE = (typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE]
