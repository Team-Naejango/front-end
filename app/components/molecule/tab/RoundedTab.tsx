'use client'

import React, { ReactNode } from 'react'
import { Tab } from '@headlessui/react'

import { cls } from '@/app/libs/client/utils/util'

export interface RoundedTabProps {
  setSelectedTab: (tab: string) => void
  children: ReactNode
}

const DEAL_TYPE_MAPPING: { label: string; name: string[] }[] = [
  { label: 'BUY', name: ['INDIVIDUAL_BUY' || 'GROUP_BUY'] },
  { label: 'SELL', name: ['INDIVIDUAL_SELL'] },
]

const ButtonType: ['BUY', 'SELL'] = ['BUY', 'SELL']

const RoundedTab = ({ setSelectedTab, children }: RoundedTabProps) => {
  return (
    <div className='w-full max-w-md pt-4'>
      <Tab.Group>
        <Tab.List className='flex p-2'>
          {DEAL_TYPE_MAPPING.map(tab => {
            return (
              <Tab
                key={tab.label}
                className={({ selected }) =>
                  cls(
                    'w-full border py-2.5 text-sm font-medium leading-5 focus:outline-none',
                    selected
                      ? 'border-[#33CC99] bg-[#33CC99] text-white'
                      : 'border-[#ccc] hover:border-[#33CC99] hover:!border-l-white hover:!border-r-white hover:bg-[#33CC99] hover:text-white'
                  )
                }
                onClick={() => setSelectedTab(tab.label)}>
                {tab.label}
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
