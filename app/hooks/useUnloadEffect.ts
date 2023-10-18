'use client'

import React, { useEffect, useRef } from 'react'

export const useUnloadEffect = (fn: () => Promise<void>) => {
  const unLoadRef = useRef(fn)

  useEffect(() => {
    const tokenKill = unLoadRef.current

    window.onbeforeunload = async () => {
      await tokenKill()
    }
  }, [unLoadRef])
}
