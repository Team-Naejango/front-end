import React from 'react'
import Link from 'next/link'

interface FloatingButtonProps {
  children: React.ReactNode
  href: string
}

const FloatingButton = ({ children, href }: FloatingButtonProps) => {
  return (
    <Link
      href={href}
      className='fixed bottom-24 right-5 flex aspect-square w-12 cursor-pointer  items-center justify-center rounded-full border-0 border-transparent bg-[#32D7A0] text-white shadow-sm transition-colors hover:bg-[#33CC99]'>
      {children}
    </Link>
  )
}

export default FloatingButton
