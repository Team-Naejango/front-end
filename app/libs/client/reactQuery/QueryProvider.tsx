'use client'

import React, { useEffect, useState } from 'react'
import { QueryClient, QueryCache, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ApiError } from 'next/dist/server/api-utils'
// import { toast } from 'react-hot-toast'

// 전역 옵션
export const defaultQueryClientOptions = {
  queries: {
    staleTime: 1000 * 60 * 3, // 3분
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retryOnMount: true,
    retry: 2,
  },
}

// 에러 전역 처리
export const defaultQueryCache = new QueryCache({
  onError: (error: unknown) => {
    if (error instanceof ApiError) {
      const errorMessage = error.message || '알 수 없는 오류 발생'
      // toast.error(errorMessage)
    } else {
      // toast.error('알 수 없는 오류 발생')
    }
    return Promise.reject(error)
  },
})

function QueryProvider({ children }: React.PropsWithChildren) {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: defaultQueryClientOptions, queryCache: defaultQueryCache })
  )

  const queryCache = queryClient.getQueryCache()
  const mutationCache = queryClient.getMutationCache()

  useEffect(() => {
    // 에러 캐시 제거 (query)
    const queryUnsubscribe = queryCache.subscribe(event => {
      if (event?.query?.state?.status === 'error') {
        const { queryKey } = event.query

        queryClient.removeQueries(queryKey)
      }
    })

    // 에러 캐시 제거 (mutation)
    const mutationUnsubscribe = mutationCache.subscribe(event => {
      if (event?.mutation?.state?.status === 'error') {
        queryClient.getMutationCache().remove(event.mutation)
      }
    })

    return () => {
      queryUnsubscribe()
      mutationUnsubscribe()
    }
  }, [queryClient, queryCache, mutationCache])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default QueryProvider
