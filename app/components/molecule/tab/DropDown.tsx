'use client'

import React, { Fragment } from 'react'
import { Menu } from '@headlessui/react'
import { CiMenuKebab } from 'react-icons/ci'
import { IoLogOutOutline, IoSettingsOutline } from 'react-icons/io5'

import { cls } from '@/app/libs/client/utils/util'

/**
 * @example labels
 *
 * const labels = [
 *   { href: '/account-settings', label: 'Account settings' },
 *   { href: '/support', label: 'Support' },
 *   { href: '/license', label: 'License' },
 *   { href: '/sign-out', label: 'Sign out' },
 * ]
 * */

interface DropDownProps {
  title?: string
  labels: Array<{ href?: string; label: string }>
  onClick?: (label: string) => void
}

const DropDown = ({ title, labels, onClick }: DropDownProps) => {
  return (
    <div className='fixed right-2 top-3 z-[9999]'>
      <Menu as='div' className='relative inline-block text-left'>
        <Menu.Button className='inline-flex w-full justify-center rounded-md text-[#222] hover:text-[#666] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
          {title || <CiMenuKebab size={'24px'} />}
        </Menu.Button>
        <Menu.Items className='absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='px-1 py-1'>
            {labels.map(value => (
              <Menu.Item as={Fragment} key={value.label}>
                {({ active }) => (
                  <span
                    role={'presentation'}
                    // href={value.href}
                    className={cls(
                      'flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm',
                      active ? 'bg-[#33CC99] text-white' : 'text-gray-900'
                    )}
                    onClick={() => (onClick ? onClick(value.label) : {})}>
                    {value.label === '설정' && <IoSettingsOutline className={'mr-1.5'} />}
                    {value.label === '나가기' && <IoLogOutOutline className={'mr-1.5'} />}
                    {value.label}
                  </span>
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
