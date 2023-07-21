/**
 *  useCustomRouter.ts
 *
 * @description router.push method in query params not supporting by nextjs 13 app directory
 *
 * @reference https://velog.io/@rrrrrrrrrrrocky/next-13-useRouter-%EC%BB%A4%EC%8A%A4%ED%85%80%ED%95%B4%EC%84%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
 *  */

import type { AppRouterInstance, PrefetchOptions } from 'next/dist/shared/lib/app-router-context'
import type { UrlObject } from 'url'
import { useRouter } from 'next/navigation'
import { ParsedUrlQueryInput } from 'querystring'

type Push = AppRouterInstance['push']

// Href: UrlObject에 auth, hash, host, hostname 등이 있는데 그중에 사용 할 속성의 타입만 Pick
interface Href extends Pick<UrlObject, 'pathname' | 'query'> {
  query?: ParsedUrlQueryInput // string 타입 제외 (객체만 들어오도록)
}
type Url = Href | string

// push, replace 메소드에 두번째 인자 타입 (optional)
interface NavigateOptions {
  forceOptimisticNavigation?: boolean
}

// params에 들어오는 query객체를 쿼리스트링 형태로 변환
const qs = (params?: Href['query']) => {
  // 인자가 없을 경우 null반환
  if (!params) return null

  const queryStringArray: string[] = []

  Object.entries(params).forEach(([key, initialValue]) => {
    const value =
      typeof initialValue === 'boolean' || typeof initialValue === 'number'
        ? JSON.stringify(initialValue)
        : initialValue
    // 객체 여부 확인
    const isObject = initialValue?.constructor === Object

    if (!value) return
    // 객체일 경우 에러
    if (isObject) throw new Error(`객체는 올 수 없습니다.`)
    // 배열값이 들어올 경우 중복 제거 후 변환
    if (Array.isArray(value)) {
      const uniqueValue = Array.from(new Set(value))
      queryStringArray.push(`${key}=${uniqueValue.join(`&${key}=`)}`)
      return
    }
    queryStringArray.push(`${key}=${value}`)
  })
  // 쿼리스트링 형태로 변환
  return queryStringArray.join('&')
}

// push, replace, refetch를 할 때, 인자에 따른 함수 실행 방법 정의
const customRouter = (href: Url, method: Push, options?: NavigateOptions & PrefetchOptions): void => {
  // ex: push('/order')의 경우 push 그대로 반환
  if (typeof href === 'string') return method(href, options)
  // pathname이 없을 경우 에러 반환
  if (!href.pathname) throw new Error('pathname이 없습니다.')
  // pathname이 있고, query가 없을 때, pathname값 반환
  if (href.pathname && !href.query) return method(href.pathname, options)
  // query에 객체가 들어오지 않는 경우 에러 반환
  if (href.query?.constructor !== Object) {
    throw new Error('query는 객체여야 합니다.')
  }

  // 위에서 만든 qs함수로 쿼리스트링 파싱
  const query: string = `${qs(href.query) ? `?${qs(href.query)}` : ''}`
  const url: string = `${href.pathname}${query}`
  return method(url, options)
}

// Custom Hooks
const useCustomRouter = () => {
  const { push: navigationPush }: AppRouterInstance = useRouter()

  // 각각의 메소드에 매핑
  const push = (href: Url, options?: NavigateOptions & PrefetchOptions): void => {
    customRouter(href, navigationPush, options)
  }

  return { push }
}

export default useCustomRouter
