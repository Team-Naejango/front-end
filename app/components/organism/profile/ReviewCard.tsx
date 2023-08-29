'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Tab } from '@headlessui/react'

import RoundedTab, { RoundedTabProps } from '@/app/components/molecule/tab/RoundedTab'
import { cls } from '@/app/libs/client/utils/util'

const ReviewCard = () => {
  const [selectedTab, setSelectedTab] = useState<'BUY' | 'SELL'>('BUY')

  const [reviews] = useState({
    '작성 가능한 리뷰': [
      {
        id: 1,
        value: '내 잔고를 부탁해',
        title: '모던리빙 호텔 수건 180g 코마사 40수 세트',
      },
      {
        id: 2,
        value: '유저닉네임',
        title: '비비안 고양이 패턴 남성 파자마 잠옷 세트',
      },
      {
        id: 3,
        value: '닉네임3',
        title: '삼다수 무라벨 2L 6개',
      },
      {
        id: 4,
        value: '닉눼임',
        title: '모던리빙 호텔 수건 180g 코마사 40수 세트',
      },
      {
        id: 5,
        value: '닉닉 네네 임',
        title: '삼다수 무라벨 2L 6개',
      },
    ],
    '작성한 리뷰': [
      {
        id: 1,
        value: '식품',
        title: '비비안 고양이 패턴 남성 파자마 잠옷 세트',
      },
      {
        id: 2,
        value: '식품',
        title: '모던리빙 호텔 수건 180g 코마사 40수 세트',
      },
    ],
  })

  return (
    <RoundedTab setSelectedTab={setSelectedTab}>
      {Object.values(reviews).map(posts => (
        <Tab.Panel key={posts[0].title} className={cls('rounded-xl bg-white pb-5 pt-2')}>
          <span className={'mr-1 flex justify-end text-[13px]'}>{posts.length} 건</span>
          {/* <ul className={'flex flex-col gap-5 p-0.5'}> */}
          {/*  {posts.map((post: RoundedTabProps) => ( */}
          {/*    <li */}
          {/*      key={post.id} */}
          {/*      className='relative flex items-center justify-around gap-8 rounded-xl border border-[#ECECEC] p-4 hover:border-[#33cc99]/30'> */}
          {/*      <div className={'h-16 w-16 rounded-md bg-gray-500'} /> */}
          {/*      <div className={'-ml-4 flex w-1/2 flex-col gap-0.5'}> */}
          {/*        <span className={'text-xs'}>{post.value}</span> */}
          {/*        <p className={'text-[13px] font-semibold'}>{post.title}</p> */}
          {/*      </div> */}
          {/*      <Link */}
          {/*        href={'/profile/review'} */}
          {/*        className={cls( */}
          {/*          'absolute inset-0 rounded-xl', */}
          {/*          'ring-[#32D7A0] focus:z-10 focus:outline-none focus:ring-1' */}
          {/*        )} */}
          {/*      /> */}
          {/*    </li> */}
          {/*  ))} */}
          {/* </ul> */}
        </Tab.Panel>
      ))}
    </RoundedTab>
  )
}

export default ReviewCard
