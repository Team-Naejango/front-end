import { GetServerSidePropsResult } from 'next'

export type Response<T = unknown> = GetServerSidePropsResult<T> & {
  [K in keyof T]: T[keyof T]
} & {
  success: boolean
}
