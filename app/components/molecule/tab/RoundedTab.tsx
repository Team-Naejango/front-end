'use client'

import React, { useState } from 'react'
import { Tab } from '@headlessui/react'
import Link from 'next/link'
import Image from 'next/image'

import { cls } from '@/app/libs/client/utils/util'

interface CategoriesProps {
  id: number
  category: string
  title: string
}

const RoundedTab = ({ categories, onDelete }: { categories: any[]; onDelete: () => void }) => {
  return (
    <div className='w-full max-w-md pt-4'>
      <Tab.Group>
        <Tab.List className='flex space-x-1 rounded-[30px] bg-[#e9e9e9] p-2'>
          {Object.keys(categories).map(category => (
            <Tab
              key={category}
              className={({ selected }) =>
                cls(
                  'leading-5, w-full rounded-[30px] py-2.5 text-sm font-medium focus:outline-none',
                  selected ? 'bg-white text-[#33CC99]' : 'hover:bg-white/[0.3]'
                )
              }>
              {category}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className='mt-2'>
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel key={posts[0].title} className={cls('rounded-xl bg-white py-5')}>
              <ul className={'flex flex-col gap-5 p-0.5'}>
                {posts.map((post: CategoriesProps) => (
                  <li
                    key={post.id}
                    className='relative flex items-center justify-around rounded-xl border border-[#ECECEC] p-4 hover:border-[#33cc99]/30'>
                    <div className={'-ml-4 flex w-1/2 flex-col gap-0.5'}>
                      <span className={'text-xs'}>{post.category}</span>
                      <p className={'text-sm font-semibold'}>{post.title}</p>
                    </div>
                    <div className={'h-16 w-16 rounded-md bg-gray-500'} />
                    <span role='presentation' onClick={onDelete} className={'absolute right-2 top-2'}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='2'
                        stroke='currentColor'
                        className='h-4 w-4'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                      </svg>
                    </span>
                    <Link
                      href={'/warehouse/item/1'}
                      className={cls(
                        'absolute inset-0 rounded-xl',
                        'ring-[#32D7A0] focus:z-10 focus:outline-none focus:ring-1'
                      )}
                    />
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default RoundedTab
