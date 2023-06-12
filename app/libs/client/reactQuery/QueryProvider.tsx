'use client'

import React from 'react'
import { QueryClientProvider, QueryClient, QueryCache } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// react-query 전역 옵션
const defaultQueryClientOptions = {
  queries: {
    staleTime: 1000 * 60 * 3, // 3분
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 2,
  },
}

// react-query 에러 전역 처리
const defaultQueryCache = new QueryCache({
  onError: (error: unknown) => {
    const { name, message } = error as Error

    console.log(`${name}: ${message}`)
    // todo: 실패알림 팝업 추가
    // todo: 쿼리 에러 전역 처리 테스트 해보기
    return Promise.reject(error)
  },
})

function QueryProvider({ children }: React.PropsWithChildren) {
  const queryClient = new QueryClient({
    defaultOptions: defaultQueryClientOptions,
    queryCache: defaultQueryCache,
  })

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default QueryProvider
