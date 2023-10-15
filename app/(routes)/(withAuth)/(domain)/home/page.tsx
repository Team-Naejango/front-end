'use client'

import React from 'react'
import { dehydrate, Hydrate } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'

import Home from '@/app/(routes)/(withAuth)/(domain)/home/home'
import getQueryClient from '@/app/libs/client/reactQuery/getQueryClient'
import { CHAT } from '@/app/libs/client/reactQuery/queryKey/chat'
import { locationState } from '@/app/store/atom'

import { nearbyGroupChat } from '@/app/apis/domain/chat/channel'

export default async function HydrateHome() {
  const userArea = useRecoilValue<{ latitude: number; longitude: number }>(locationState)

  const queryClient = getQueryClient()

  await queryClient.prefetchQuery([CHAT.근처그룹조회], () =>
    nearbyGroupChat({
      lon: String(userArea.longitude),
      lat: String(userArea.latitude),
      rad: '1500',
    })
  )
  const dehydratedState = dehydrate(queryClient)

  return (
    <Hydrate state={dehydratedState}>
      <Home />
    </Hydrate>
  )
}
