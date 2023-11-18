import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'

import UseAxiosWrapper from '../../../app/components/molecule/common/UseAxiosWrapper'

const generateQueryClient = () => {
  return new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
}

export function renderWithQueryClient(ui, client) {
  // 테스트 케이스간 캐시 데이터를 공유하지 않기 위해 새로운 쿼리 클라이언트를 부여한다
  const queryClient = client ?? generateQueryClient()

  return render(
    <QueryClientProvider client={queryClient}>
      <UseAxiosWrapper>{ui}</UseAxiosWrapper>
    </QueryClientProvider>
  )
}
