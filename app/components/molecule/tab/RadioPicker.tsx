'use client'

import React, { Dispatch, SetStateAction, SVGProps } from 'react'
import { RadioGroup } from '@headlessui/react'

export type DataTypes = {
  label: string
  value: number
}

interface RadioPickerProps {
  data: DataTypes[]
  selectedRadio: DataTypes
  setSelectedRadio: Dispatch<SetStateAction<DataTypes>>
}

function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 24 24' fill='none' {...props}>
      <circle cx={12} cy={12} r={12} fill='#fff' opacity='0.2' />
      <path d='M7 13l3 3 7-7' stroke='#fff' strokeWidth={1.5} strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

const RadioPicker = ({ data, selectedRadio, setSelectedRadio }: RadioPickerProps) => {
  return (
    <div className='w-full pb-8 pt-4'>
      <div className='mx-auto w-full max-w-md'>
        <RadioGroup value={selectedRadio} onChange={setSelectedRadio}>
          <RadioGroup.Label className='sr-only'>Server size</RadioGroup.Label>
          <div className='space-y-5'>
            {data.map(value => (
              <RadioGroup.Option
                key={value.label}
                value={value}
                className={({ active, checked }) =>
                  `${active ? 'ring-1 ring-white ring-opacity-60 ring-offset-1 ring-offset-[#32D7A0]' : ''}
                    relative flex cursor-pointer rounded-lg bg-[#f6f6f6] px-5 py-4 focus:outline-none`
                }>
                {({ active, checked }) => (
                  <>
                    <div className='flex w-full items-center justify-between'>
                      <div className='flex items-center'>
                        <div>
                          <RadioGroup.Label as='p' className={`text-[13px] font-normal text-[#222]`}>
                            {value.value.toLocaleString()} 잔고
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as='span'
                            className={`mt-2 inline-block text-[15px] font-bold text-[#222]`}>
                            {value.label}
                          </RadioGroup.Description>
                        </div>
                      </div>
                      <div className='shrink-0 text-white'>
                        <input
                          type='radio'
                          value={value.value}
                          checked={checked}
                          readOnly
                          className={`${
                            checked ? 'text-[#32D7A0] ring-1 ring-white ring-offset-1 ring-offset-[#32D7A0]' : ''
                          } border-2 border-[#32D7A0] text-[#32D7A0]`}
                        />
                      </div>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

export default RadioPicker
