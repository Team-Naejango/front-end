import React from 'react'

import { cls } from '@/app/libs/client/utils/util'

interface ButtonProps {
  large?: boolean
  text: string
  [key: string]: any
}

const Button = ({ large = false, onClick, text, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={cls(
        'w-full rounded-md border border-transparent  bg-[#A3D139] px-4 font-medium text-white shadow-sm hover:bg-[#A3D139] focus:outline-none focus:ring-2 focus:ring-[#A3D139] focus:ring-offset-2',
        large ? 'py-3 text-base' : 'py-2 text-sm '
      )}>
      {text}
    </button>
  )
}

export default Button
