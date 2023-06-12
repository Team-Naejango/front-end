'use client'

import React from 'react'

const GlobalError = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <html lang={'ko-KR'}>
      <body>
        <h2>{`${error.name} : ${error.message}`}</h2>
        <button onClick={() => reset()}>다시 시도</button>
      </body>
    </html>
  )
}

export default GlobalError
