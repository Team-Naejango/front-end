'use client'

import React, { ReactNode } from 'react'
import { MutableSnapshot, RecoilRoot } from 'recoil'
import { kakaoAccessToken } from '@/app/store/atom'

type Props = {
  children: ReactNode
}

// todo: Recoil 초기화 작업
const initialState = ({ set }: MutableSnapshot) => {
  // set(kakaoAccessToken, '')
}

export default function RecoilProvider({ children }: Props) {
  return <RecoilRoot initializeState={initialState}>{children}</RecoilRoot>
}
