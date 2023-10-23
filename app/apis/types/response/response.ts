export interface Paging {
  // 현재 페이지
  page: number
  // 사이즈
  size: number
  // 전체 페이지
  totalPage: number
  // 전체 row
  totalCount: number
  // 검색 결과 수
  result: number
}

export type Common = {
  message: string
  result: any | any[]
}

export type Response<T = unknown> = {
  [K in keyof T]: T[keyof T]
} & {
  GetServerSidePropsResult: T
  success: boolean
}

export interface TokenRefreshAxiosErrorResponse {
  body: {
    error: string
    message: string
    status: number
    reissuedAccessToken: string
  }
}

export interface AxiosErrorResponse {
  error: string
  message: string
  status: number
}
