export type Response<T = unknown> = {
  [K in keyof T]: T[keyof T]
} & {
  GetServerSidePropsResult: T
  success: boolean
}
