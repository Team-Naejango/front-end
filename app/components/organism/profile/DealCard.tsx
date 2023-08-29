'use client'

import React, { useState } from 'react'
import { Tab } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'

import { cls } from '@/app/libs/client/utils/util'
import RoundedTab, { RoundedTabProps } from '@/app/components/molecule/tab/RoundedTab'
import { DEAL } from '@/app/libs/client/reactQuery/queryKey/profile/deal'

import { deal } from '@/app/apis/domain/profile/deal'

const DealCard = ({ onClick }: { onClick: () => void }) => {
  const [selectedTab, setSelectedTab] = useState<'BUY' | 'SELL'>('BUY')

  // 거래 조회
  const { data: { data: _deal } = {} } = useQuery([DEAL.조회], () => deal())

  const [deals] = useState({
    구매: [
      {
        id: 1,
        value: '내 잔고를 부탁해',
        title: '모던리빙 호텔 수건 180g 코마사 40수 세트wwwwwwwwwwww',
        swap: 'BUY',
      },
      {
        id: 2,
        value: '유저닉네임',
        title: '비비안 고양이 패턴 남성 파자마 잠옷 세트',
        swap: 'SELL',
      },
      {
        id: 3,
        value: '닉네임3',
        title: '삼다수 무라벨 2L 6개',
        swap: 'SELL',
      },
      {
        id: 4,
        value: '닉눼임',
        title: '모던리빙 호텔 수건 180g 코마사 40수 세트',
        swap: 'SELL',
      },
      {
        id: 5,
        value: '닉닉 네네 임',
        title: '삼다수 무라벨 2L 6개',
        swap: 'BUY',
      },
    ],
    판매: [
      {
        id: 1,
        value: '식품',
        title: '비비안 고양이 패턴 남성 파자마 잠옷 세트',
        swap: 'BUY',
      },
      {
        id: 2,
        value: '식품',
        title: '모던리빙 호텔 수건 180g 코마사 40수 세트',
        swap: 'SELL',
      },
    ],
  })

  // const filteredDealList = _deal?.filter(item => item.type === selectedTab)

  return (
    <RoundedTab setSelectedTab={setSelectedTab}>
      {Object.values(deals).map(deal => (
        <Tab.Panel key={deal[0].title} className={cls('rounded-xl bg-white pb-5 pt-2')}>
          <span className={'mr-1 flex justify-end text-[13px]'}>{deal.length} 건</span>
          {/* <ul className={'flex flex-col p-0.5'}> */}
          {/*  {deal && deal.length !== 0 ? ( */}
          {/*    deal.map((post: RoundedTabProps) => ( */}
          {/*      // <li */}
          {/*      //   role={'presentation'} */}
          {/*      //   key={post.id} */}
          {/*      //   className='relative flex cursor-pointer items-center rounded-xl p-4' */}
          {/*      //   onClick={onClick}> */}
          {/*      //   <div className={'h-16 w-16 rounded-md bg-gray-500'} /> */}
          {/*      //   <div className={'ml-4 flex w-9/12 flex-col gap-0.5'}> */}
          {/*      //     <span className={'text-xs'}> */}
          {/*      //       <span */}
          {/*      //         className={cls( */}
          {/*      //           'mr-1.5 rounded px-1 py-1 text-[10px] text-white', */}
          {/*      //           post.swap === 'BUY' ? 'bg-[#30BD81] !px-1.5' : 'bg-[#A3D139]' */}
          {/*      //         )}> */}
          {/*      //         {post.swap} */}
          {/*      //       </span> */}
          {/*      //       {post.value} */}
          {/*      //     </span> */}
          {/*      //     <p className={'overflow-hidden overflow-ellipsis whitespace-nowrap text-[13px] font-semibold'}> */}
          {/*      //       {post.title} */}
          {/*      //     </p> */}
          {/*      //     <span className={'text-xs'}>날짜</span> */}
          {/*      //   </div> */}
          {/*      // </li> */}
          {/*    )) */}
          {/*  ) : ( */}
          {/*    <div className={'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'}> */}
          {/*      <p className={'text-[15px]'}>거래한 목록이 없습니다.</p> */}
          {/*    </div> */}
          {/*  )} */}
          {/* </ul> */}
        </Tab.Panel>
      ))}
    </RoundedTab>
  )
}

export default DealCard
