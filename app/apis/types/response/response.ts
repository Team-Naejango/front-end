// export interface Paging {
//   page: number // 현재 페이지
//   size: number // ?
//   totalPage: number // 전체 페이지
//   totalCount: number // 전체 row
// }

export type Response<T = unknown> = {
  [K in keyof T]: T[keyof T]
} & {
  GetServerSidePropsResult: T
  success: boolean
  // paging?: Paging
  page?: number // 현재 페이지
  size?: number // 사이즈
  totalPage?: number // 전체 페이지
  totalCount?: number // 전체 row
}
