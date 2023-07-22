import React from 'react'
import Link from 'next/link'
import { UrlObject } from 'url'

interface FloatingButtonProps {
  children: React.ReactNode
  href: string | UrlObject
  prefetch?: boolean
}

const FloatingButton = ({ children, href, prefetch }: FloatingButtonProps) => {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className='fixed bottom-24 right-5 flex aspect-square w-12 cursor-pointer  items-center justify-center rounded-full border-0 border-transparent bg-[#32D7A0] text-white shadow-sm transition-colors hover:bg-[#33CC99]'>
      {children}
    </Link>
  )
}

export default FloatingButton
