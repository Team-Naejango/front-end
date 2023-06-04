import React from 'react'

import { cls } from '@/app/libs/client/utils/util'

interface ButtonProps {
  smail?: boolean
  onClick?: (event: React.MouseEvent) => void
  text: string
  [key: string]: any
}

const Button = ({ smail = false, onClick, text, ...rest }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      {...rest}
      className={cls(
        ' rounded-md border border-transparent bg-[#A3D139] px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-[#AFD751] focus:outline-none focus:ring-2 focus:ring-[#A3D139] focus:ring-offset-2',
        smail ? 'ml-2 flex-1 whitespace-nowrap' : 'w-full '
      )}>
      {text}
    </button>
  )
}

export default Button
