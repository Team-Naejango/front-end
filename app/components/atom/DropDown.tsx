'use client'

import React, { Fragment } from 'react'
import { Menu } from '@headlessui/react'
import Link from 'next/link'

import { cls } from '@/app/libs/client/utils/util'

interface DropDownProps {
  title: string
  links: Array<any>
}

/**
 * @example links
 *
 * const links = [
 *   { href: '/account-settings', label: 'Account settings' },
 *   { href: '/support', label: 'Support' },
 *   { href: '/license', label: 'License' },
 *   { href: '/sign-out', label: 'Sign out' },
 * ]
 * */

const DropDown = ({ title, links }: DropDownProps) => {
  return (
    <div className='fixed top-16 w-56 text-right'>
      <Menu as='div' className='relative inline-block text-left'>
        <Menu.Button className='inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
          {title}
        </Menu.Button>
        <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='px-1 py-1'>
            {links.map(link => (
              <Menu.Item key={link.href} as={Fragment}>
                {({ active }) => (
                  <Link
                    href={link.href}
                    className={cls(
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    )}>
                    {link.label}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Menu>
    </div>
  )
}

export default DropDown
