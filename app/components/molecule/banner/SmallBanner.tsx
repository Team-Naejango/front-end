import React from 'react'

const SmallBanner = ({ onClick, onClose }: { onClick: () => void; onClose: () => void }) => {
  return (
    <div className='relative isolate mt-4 flex items-center justify-around gap-4 overflow-hidden bg-gray-50 py-2.5 pl-6'>
      <div
        className='absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl'
        aria-hidden='true'>
        <div
          className='aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30'
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
        />
      </div>
      <div
        className='absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl'
        aria-hidden='true'>
        <div
          className='aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30'
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
        />
      </div>
      <div role={'presentation'} onClick={onClick} className='flex cursor-pointer items-center'>
        <p className='text-sm leading-6 text-gray-900'>
          <strong className='font-semibold'>열기구 여행 티켓</strong>
          <svg viewBox='0 0 2 2' className='mx-2 inline h-0.5 w-0.5 fill-current' aria-hidden='true'>
            <circle cx={1} cy={1} r={1} />
          </svg>
          참여만해도 경품 당첨!
        </p>
      </div>
      <div className={'flex'}>
        <button type='button' onClick={onClose} className='hover:text-[#444] focus-visible:outline-offset-[-4px]'>
          <span className='sr-only'>Dismiss</span>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-5 w-5'>
            <path d='M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z' />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default SmallBanner
