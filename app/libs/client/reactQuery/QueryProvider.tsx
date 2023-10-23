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
    retry: false,
  },
}

// 에러 전역 처리
export const defaultQueryCache = new QueryCache({
  onError: (error: unknown) => {
    if (error instanceof ApiError) {
      // const errorMessage = error.message || '통신 에러가 발생하였습니다. \n 잠시 후 다시 시도해주세요.'
      // toast.error(errorMessage)
    } else {
      // toast.error('통신 에러가 발생하였습니다. \n 잠시 후 다시 시도해주세요.')
    }
    return Promise.reject(error)
  },
})

function QueryProvider({ children }: React.PropsWithChildren) {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: defaultQueryClientOptions, queryCache: defaultQueryCache })
  )

  const queryCache = queryClient.getQueryCache()

  useEffect(() => {
    // 에러 캐시 제거 (query)
    const queryUnsubscribe = queryCache.subscribe(event => {
      if (event?.query?.state?.status === 'error') {
        const { queryKey } = event.query

        queryClient.removeQueries(queryKey)
      }
    })

    return () => {
      queryUnsubscribe()
    }
  }, [queryClient, queryCache])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default QueryProvider
