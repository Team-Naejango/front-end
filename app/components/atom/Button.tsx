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
        'rounded-md border border-transparent bg-[#A3D139] px-4 py-2.5 text-[13px] font-medium text-white shadow-sm hover:bg-[#AFD751] focus:outline-none focus:ring-2 focus:ring-[#A3D139] focus:ring-offset-2',
        smail ? `ml-2 flex-1 whitespace-nowrap ${className}` : 'w-full',
        disabled ? 'bg-[#ddd] hover:bg-[#ddd]' : ''
      )}>
      {text}
    </button>
  )
}

export default Button
