import React, { FormEventHandler } from 'react'

import { cls } from '@/app/libs/client/utils/util'

interface ButtonProps {
  smail?: boolean
  onClick?: (event: React.MouseEvent) => void
  onSubmit?: FormEventHandler
  text: string
  [key: string]: any
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const Button = ({ smail = false, onClick, onSubmit, type, text, className, disabled }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      onSubmit={onSubmit}
      disabled={disabled}
      className={cls(
        'rounded-md border border-transparent bg-[#33CC99] px-4 py-2.5 text-[14px] font-medium text-white shadow-sm hover:bg-[#32D7A0] focus:outline-none focus:ring-2 focus:ring-[#33CC99] focus:ring-offset-2',
        smail ? `ml-2 flex-1 whitespace-nowrap ${className}` : 'w-full',
        disabled ? 'bg-[#ddd] hover:bg-[#ddd]' : ''
      )}>
      {text}
    </button>
  )
}

export default Button
