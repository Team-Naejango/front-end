'use client'

import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const isLoggedIn = searchParams.get('isLoggedIn') === 'true'

  useEffect(() => {
    if (isLoggedIn) {
      const onLimitBack = () => {
        window.addEventListener('popstate', () => {
          router.replace('/home')
        })
      }
      window.addEventListener('popstate', onLimitBack)
      return () => {
        window.removeEventListener('popstate', onLimitBack)
      }
    }
  }, [isLoggedIn, router])

  return <>{children}</>
}
