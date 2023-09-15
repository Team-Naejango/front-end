import React from 'react'
import { dehydrate, Hydrate } from '@tanstack/react-query'

import Home from '@/app/(routes)/(home)/(main)/home/page'
import getQueryClient from '@/app/libs/client/reactQuery/getQueryClient'
import { getPosts } from '@/app/(routes)/(home)/(main)/home/getPosts'

export default async function HydratedPosts() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(['test'], getPosts)
  const dehydratedState = dehydrate(queryClient)

  return (
    <Hydrate state={dehydratedState}>
      <Home />
    </Hydrate>
  )
}
