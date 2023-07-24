import React, { FormEventHandler, forwardRef, MutableRefObject } from 'react'

import { cls } from '@/app/libs/client/utils/util'

interface ButtonProps {
  smail?: boolean
  cancel?: boolean
  onClick?: (event: React.MouseEvent) => void
  onSubmit?: FormEventHandler
  text: string
  [key: string]: any
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  newRef?: MutableRefObject<null>
}

const Button = forwardRef(
  ({ smail = false, cancel = false, newRef, onClick, onSubmit, type, text, className, disabled }: ButtonProps, ref) => {
    return (
      <button
        ref={newRef}
        type={type}
        onClick={onClick}
        onSubmit={onSubmit}
        disabled={disabled}
        className={cls(
          `rounded-md border border-transparent bg-[#33CC99] px-4 py-2.5 text-[14px] font-medium text-white shadow-sm hover:bg-[#32D7A0] focus:outline-none focus:ring-2 focus:ring-[#33CC99] focus:ring-offset-1 ${className}`,
          smail ? `ml-2 flex-1 whitespace-nowrap` : 'w-full',
          disabled ? 'bg-[#ddd] hover:bg-[#ddd]' : '',
          cancel
            ? '!border-[#ccc] !bg-white !text-[#222] hover:!border-[#33CC99] hover:!bg-[#33CC99] hover:!text-white'
            : ''
        )}>
        {text}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
