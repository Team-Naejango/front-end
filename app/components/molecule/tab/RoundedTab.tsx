'use client'

import React, { useState } from 'react'
import { Tab } from '@headlessui/react'
import Link from 'next/link'

import { cls } from '@/app/libs/client/utils/util'
import Image from 'next/image'

const RoundedTab = () => {
  const [categories] = useState({
    BUY: [
      {
        id: 1,
        category: '식품',
        title: '모던리빙 호텔 수건 180g 코마사 40수 세트',
      },
      {
        id: 2,
        category: '식품',
        title: '비비안 고양이 패턴 남성 파자마 잠옷 세트',
      },
      {
        id: 3,
        category: '식품',
        title: '삼다수 무라벨 2L 6개',
      },
      {
        id: 4,
        category: '식품',
        title: '모던리빙 호텔 수건 180g 코마사 40수 세트',
      },
      {
        id: 5,
        category: '식품',
        title: '삼다수 무라벨 2L 6개',
      },
    ],
    SELL: [
      {
        id: 1,
        category: '식품',
        title: '비비안 고양이 패턴 남성 파자마 잠옷 세트',
      },
      {
        id: 2,
        category: '식품',
        title: '모던리빙 호텔 수건 180g 코마사 40수 세트',
      },
    ],
  })

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
                  selected ? 'bg-white' : 'hover:bg-white/[0.12] hover:text-white'
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
                {posts.map(post => (
                  <li
                    key={post.id}
                    className='relative flex items-center justify-around rounded-xl border border-[#ECECEC] p-4 hover:border-[#33cc99]/30'>
                    <div className={'-ml-4 flex w-1/2 flex-col gap-0.5'}>
                      <span className={'text-xs'}>{post.category}</span>
                      <p className={'text-sm font-semibold'}>{post.title}</p>
                    </div>
                    <div className={'h-16 w-16 rounded-md bg-gray-500'} />
                    <span className={'absolute right-2 top-2'}>
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
                    {/* <ul className='mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500'> */}
                    {/* <li>식품</li> */}
                    {/* <li>품목 이름</li> */}
                    {/* <li> */}
                    {/*  <div className={'h-16 w-16 bg-gray-500'} /> */}
                    {/* </li> */}
                    {/* <li>{post.date}</li> */}
                    {/* <li>&middot;</li> */}
                    {/* <li>{post.commentCount} comments</li> */}
                    {/* <li>&middot;</li> */}
                    {/* <li>{post.shareCount} shares</li> */}
                    {/* </ul> */}

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
