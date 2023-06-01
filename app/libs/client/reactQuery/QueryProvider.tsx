'use client'

import React from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// react-query 전역 옵션
const defaultQueryClientOptions = {
  queries: {
    staleTime: 1000 * 60 * 3, // 3분
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 2,
    suspense: true,
  },
}

function QueryProvider({ children }: React.PropsWithChildren) {
  const queryClient = new QueryClient({
    defaultOptions: defaultQueryClientOptions,
  })

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default QueryProvider
