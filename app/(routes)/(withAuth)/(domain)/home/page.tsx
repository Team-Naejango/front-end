'use client'

import React from 'react'
import { dehydrate, Hydrate } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'

import Home from '@/app/(routes)/(withAuth)/(domain)/home/home'
import getQueryClient from '@/app/libs/client/reactQuery/getQueryClient'
import { CHAT } from '@/app/libs/client/reactQuery/queryKey/chat'
import { currentLocationState, locationRealState, locationState } from '@/app/store/atom'

import { nearbyGroupChat } from '@/app/apis/domain/chat/channel'
import { E_SWITCH_STATUS } from '@/app/libs/client/constants/code'

export default async function HydrateHome() {
  const isCurrentLocationStatus = useRecoilValue<E_SWITCH_STATUS>(currentLocationState)
  const userArea = useRecoilValue<{ latitude: number; longitude: number }>(locationState)
  const userRealArea = useRecoilValue<{ latitude: number; longitude: number }>(locationRealState)

  const queryClient = getQueryClient()

  await queryClient.prefetchQuery([CHAT.근처그룹조회], () =>
    nearbyGroupChat({
      lon: String(isCurrentLocationStatus ? userRealArea.latitude : userArea.latitude),
      lat: String(isCurrentLocationStatus ? userRealArea.latitude : userArea.latitude),
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
