'use client'

import React, { Fragment, Dispatch, SetStateAction } from 'react'
import { Combobox, Transition } from '@headlessui/react'

import { cls } from '@/app/libs/client/utils/util'

interface MultiSelectBoxProps {
  title?: string
  essential?: boolean
  data: { id: number; name: string }[]
  selected: {
    id: number
    name: string
  }[]
  setSelected: Dispatch<SetStateAction<any>>
}

const MultiSelectBox = ({ title, data, selected, setSelected, essential }: MultiSelectBoxProps) => {
  const onDeleteSelectedStorage = (value: { id: number; name: string }) => {
    const selectedStorageUpdate = selected.filter(el => el.id !== value.id)
    setSelected(selectedStorageUpdate)
  }

  return (
    <div className='mt-1 w-full'>
      {title ? (
        <span className='mb-2 block text-xs font-medium text-gray-700'>
          {essential && <span className={'text-red-500'}>*</span>}
          {title}
        </span>
      ) : null}
      <Combobox value={selected} onChange={setSelected} multiple>
        <div className='relative mt-1'>
          <Combobox.Button
            className={cls(
              'relative flex w-full cursor-default gap-1 rounded-md bg-white py-1.5 pl-2 pr-10 text-left text-sm leading-8 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-1 focus:ring-[#32D7A0]',
              selected.length === 0 ? 'h-[42px]' : ''
            )}>
            {selected.map((data: any) => (
              <div key={data.name} className={'flex items-center rounded-[20px] border py-1.5 pl-3 pr-1.5'}>
                <span className={'block truncate text-xs'}>{data.name}</span>
                <span
                  role='presentation'
                  className='ml-2 flex cursor-pointer text-gray-500 hover:text-red-500 focus:outline-none'
                  onClick={() => onDeleteSelectedStorage(data)}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </span>
              </div>
            ))}
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400'>
              <svg
                aria-hidden
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='h-5 w-5'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9'
                />
              </svg>
            </span>
          </Combobox.Button>

          <Transition as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
            <Combobox.Options className='absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {data.length === 0 ? (
                <div className='relative cursor-default select-none px-4 py-2 text-gray-700'>데이터가 없습니다.</div>
              ) : (
                data.map(person => (
                  <Combobox.Option
                    key={person.name}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-[#eee]' : ''}`
                    }
                    value={person}>
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate text-sm ${selected ? 'font-medium' : 'font-normal'}`}>
                          {person.name}
                        </span>
                        {selected ? (
                          <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-[#33cc99]'>
                            <svg
                              aria-hidden
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth='2'
                              stroke='currentColor'
                              className='h-4 w-4'>
                              <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                            </svg>
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}

export default MultiSelectBox
