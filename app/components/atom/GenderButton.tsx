'use client'

import React from 'react'
import { cls } from '@/app/libs/client/utils/util'

interface Props {
  gender: string
  selected: boolean
  disabled?: boolean
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const GenderButton = ({ gender, selected, disabled, onClick }: Props) => {
  const buttonClasses = selected ? `bg-[#33CC99] text-[#fff] border-transparent` : ''

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    onClick(event)
  }

  return (
    <button
      disabled={disabled}
      className={cls(
        'ml-2 whitespace-nowrap rounded-md border border-gray-300 px-4 py-2.5 text-[13px] font-medium text-[#222] shadow-sm hover:border-transparent hover:bg-[#33CC99] hover:text-[#fff] focus:outline-none',
        buttonClasses,
        disabled ? 'bg-[#eee] hover:border-gray-300 hover:bg-[#eee] hover:text-[#222]' : ''
      )}
      onClick={handleClick}>
      {gender}
    </button>
  )
}

export default GenderButton
