'use client'

import React from 'react'

const NotFound = ({ reset }: { reset: () => void }) => {
  return (
    <html lang={'ko-KR'}>
      <body>
        <div className={'flex h-full flex-col items-center justify-center gap-2.5'}>
          <h2 className={'text-center text-sm'}>
            [404] <br />
            요청한 페이지를 찾을 수 없습니다. <br /> 잠시 후 다시 시도해주세요.
          </h2>
          <button onClick={() => reset()} className={'rounded bg-[#ececec] px-2 py-1 text-sm hover:bg-[#ddd]'}>
            재시도
          </button>
        </div>
      </body>
    </html>
  )
}

export default NotFound
