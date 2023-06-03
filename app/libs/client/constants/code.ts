/**
 * API 결과 코드
 */
export const API_RESULT = {
  성공: true,
  실패: false,
} as const

type E_API_RESULT = (typeof API_RESULT)[keyof typeof API_RESULT]

/**
 * 인증 토큰
 */
export const AUTH_TOKEN = {
  접근: 'access_token',
  갱신: 'refresh_token',
} as const

/**
 * FLAG
 */
export const FLAG = {
  TRUE: 1,
  FALSE: 0,
} as const

export type E_FLAG = (typeof FLAG)[keyof typeof FLAG]

/**
 * 정렬순서
 */
export const ORDER = {
  일련번호_오름차순: 'seq',
  일련번호_내림차순: '-seq',
  SORT_오름차순: 'sort',
  SORT_내림차순: '-sort',
  등록일_최신순: '-create_at',
} as const

export type E_ORDER = (typeof ORDER)[keyof typeof ORDER]

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
