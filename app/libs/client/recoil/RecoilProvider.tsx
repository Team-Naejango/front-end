'use client'

import React, { ReactNode } from 'react'
import { RecoilRoot } from 'recoil'

type Props = {
  children: ReactNode
}

export default function RecoilProvider({ children }: Props) {
  return <RecoilRoot>{children}</RecoilRoot>
}
