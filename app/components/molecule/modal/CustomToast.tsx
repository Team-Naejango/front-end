'use client'

import React from 'react'
import { ToastBar, Toaster } from 'react-hot-toast'

const CustomToast = () => {
  return (
    <Toaster
      position={'bottom-center'}
      containerStyle={{
        position: 'absolute',
        bottom: '13%',
        fontSize: '11px',
        letterSpacing: '0.1px',
      }}
      toastOptions={{
        style: {
          padding: '10px 12px',
          boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.01)',
        },
      }}>
      {t => (
        <ToastBar
          toast={t}
          style={{
            ...t.style,
            animation: t.visible ? 'custom-enter 1s ease' : 'custom-exit 1s ease',
          }}
        />
      )}
    </Toaster>
  )
}

export default CustomToast
