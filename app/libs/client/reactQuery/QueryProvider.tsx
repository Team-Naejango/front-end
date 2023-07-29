'use client'

import React, { useEffect } from 'react'
import { QueryClient, QueryCache, MutationCache, QueryClientProvider, Hydrate, dehydrate } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { toast } from 'react-hot-toast'

// 전역 옵션
const defaultQueryClientOptions = {
  queries: {
    staleTime: 1000 * 60 * 3, // 3분
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retryOnMount: true,
    retry: 2,
  },
}

// 에러 전역 처리 (query)
const defaultQueryCache = new QueryCache({
  onError: (error: unknown) => {
    const { name, message } = error as Error
    console.log(`${name}: ${message}`)
    toast.error('서버 요청 에러가 발생했습니다.')
    return Promise.reject(error)
  },
})

// 에러 전역 처리 (mutation)
const defaultMutationCache = new MutationCache({
  onError: (error: unknown) => {
    const { name, message } = error as Error
    console.log(`${name}: ${message}`)
    toast.error('서버 요청 에러가 발생했습니다.')
    return Promise.reject(error)
  },
})

function QueryProvider({ children }: React.PropsWithChildren) {
  const query = new QueryClient({
    defaultOptions: defaultQueryClientOptions,
    queryCache: defaultQueryCache,
    mutationCache: defaultMutationCache,
  })

  const queryCache = query.getQueryCache()
  const mutationCache = query.getMutationCache()

  useEffect(() => {
    // 에러 캐시 제거 (query)
    const queryUnsubscribe = queryCache.subscribe(event => {
      if (event?.query?.state?.status === 'error') {
        const { queryKey } = event.query

        query.removeQueries(queryKey)
      }
    })

    // 에러 캐시 제거 (mutation)
    const mutationUnsubscribe = mutationCache.subscribe(event => {
      if (event?.mutation?.state?.status === 'error') {
        query.getMutationCache().remove(event.mutation)
      }
    })

    return () => {
      queryUnsubscribe()
      mutationUnsubscribe()
    }
  }, [query, queryCache, mutationCache])

  return (
    // todo: 쿼리 하이드레이트 작업
    <QueryClientProvider client={query}>
      <Hydrate state={dehydrate(query)}>{children}</Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default QueryProvider
