'use client'

import React from 'react'

interface Props {
  gender: string
  selected: boolean
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const GenderButton = ({ gender, selected, onClick }: Props) => {
  const buttonClasses = selected ? `bg-[#A3D139] text-[#fff] border-transparent` : ''

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    onClick(event)
  }

  return (
    <button
      className={`ml-2 whitespace-nowrap rounded-md border border-gray-300 px-4 py-2.5 text-[13px] font-medium text-[#222] shadow-sm hover:border-transparent hover:bg-[#AFD751] hover:text-[#fff] focus:outline-none ${buttonClasses}`}
      onClick={handleClick}>
      {gender}
    </button>
  )
}

export default GenderButton
