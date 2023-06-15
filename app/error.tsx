'use client'

import React from 'react'

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className={'flex flex-col items-center justify-center'}>
      <h2>{`${error.name} : ${error.message}`}</h2>
      <button onClick={() => reset()}>다시 시도</button>
    </div>
  )
}

export default Error
