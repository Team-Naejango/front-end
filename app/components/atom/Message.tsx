import React from 'react'

import { cls } from '@/app/libs/client/utils/util'

interface MessageProps {
  message: string
  reversed?: boolean
  avatarUrl?: string
}

const Message = ({ message, avatarUrl, reversed }: MessageProps) => {
  return (
    <div className={cls('flex  items-start', reversed ? 'flex-row-reverse space-x-2 !space-x-reverse' : 'space-x-2')}>
      <div className='h-8 w-8 rounded-full bg-slate-400' />
      <div className='w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700'>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default Message
