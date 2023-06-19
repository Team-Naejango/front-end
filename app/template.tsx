import React from 'react'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <main className='after:w-50 after:h-50 relative z-10 mx-auto h-[750px] w-[375px] max-w-xl overflow-visible bg-[#fff] p-4 after:absolute after:left-2/4 after:top-1/2 after:z-[-1] after:box-content after:block after:h-[750px] after:w-[375px] after:translate-x-[-50%] after:translate-y-[-50%] after:rounded-[30px] after:border-[10px] after:border-white after:bg-transparent after:content-[""]'>
      {children}
    </main>
  )
}
