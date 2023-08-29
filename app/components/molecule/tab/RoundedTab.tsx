'use client'

import React, { ReactNode, Dispatch, SetStateAction } from 'react'
import { Tab } from '@headlessui/react'

import { cls } from '@/app/libs/client/utils/util'

export interface RoundedTabProps {
  selectedTab: 'BUY' | 'SELL'
  setSelectedTab: (tab: 'BUY' | 'SELL') => void
  children: ReactNode
}

const ButtonType: ['BUY', 'SELL'] = ['BUY', 'SELL']

const RoundedTab = ({ selectedTab, setSelectedTab, children }: RoundedTabProps) => {
  return (
    <div className='w-full max-w-md pt-4'>
      <Tab.Group>
        <Tab.List className='flex p-2'>
          {ButtonType.map(tab => {
            return (
              <Tab
                key={tab}
                className={({ selected }) =>
                  cls(
                    'w-full border py-2.5 text-sm font-medium leading-5 focus:outline-none',
                    selected
                      ? 'border-[#33CC99] bg-[#33CC99] text-white'
                      : 'border-[#ccc] hover:border-[#33CC99] hover:!border-l-white hover:!border-r-white hover:bg-[#33CC99] hover:text-white'
                  )
                }
                onClick={() => setSelectedTab(tab)}>
                {tab}
              </Tab>
            )
          })}
        </Tab.List>

        <Tab.Panels className='mt-2'>{children}</Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default RoundedTab
