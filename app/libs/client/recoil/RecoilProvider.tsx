'use client'

import React, { ReactNode } from 'react'
import { MutableSnapshot, RecoilRoot } from 'recoil'

type Props = {
  children: ReactNode
}

const initialState = ({ set }: MutableSnapshot) => {}

export default function RecoilProvider({ children }: Props) {
  return <RecoilRoot initializeState={initialState}>{children}</RecoilRoot>
}
