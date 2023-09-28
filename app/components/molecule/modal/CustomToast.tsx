'use client'

import React from 'react'
import toast, { ToastBar, Toaster } from 'react-hot-toast'

const CustomToast = () => {
  return (
    <Toaster
      position={'bottom-center'}
      containerStyle={{
        position: 'absolute',
        bottom: '15%',
        fontSize: '11px',
        letterSpacing: '0.2px',
      }}
      toastOptions={{
        duration: 1500,
        style: {
          padding: '10px 12px',
          boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.01)',
        },
      }}>
      {t => (
        <>
          <ToastBar
            toast={t}
            style={{
              ...t.style,
              animation: t.visible ? 'custom-enter 1s ease' : 'custom-exit 1s ease',
            }}>
            {({ icon, message }) => (
              <>
                <div role={'presentation'} className={'flex cursor-pointer'} onClick={() => toast.remove(t.id)}>
                  {icon}
                  {message}
                </div>
              </>
            )}
          </ToastBar>
        </>
      )}
    </Toaster>
  )
}

export default CustomToast
