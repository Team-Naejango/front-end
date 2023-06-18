'use client'

import React from 'react'

const Error = ({ reset }: { reset: () => void }) => {
  return (
    <div className={'flex h-full flex-col items-center justify-center gap-2.5'}>
      <h2 className={'text-sm'}>알 수 없는 에러가 발생했습니다. 잠시 후 다시 시도해주세요.</h2>
      <button onClick={() => reset()} className={'rounded bg-[#ececec] px-2 py-1 text-sm hover:bg-[#ddd]'}>
        재시도
      </button>
    </div>
  )
}

export default Error
