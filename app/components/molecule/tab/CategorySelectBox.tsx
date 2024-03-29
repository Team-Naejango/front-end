'use client'

import React, { Fragment, Dispatch, SetStateAction } from 'react'
import { Listbox, Transition } from '@headlessui/react'

import { cls } from '@/app/libs/client/utils/util'
import { CategoryResult } from '@/app/apis/types/domain/common/category'

interface SelectBoxProps {
  title?: string
  essential?: boolean
  disabled?: boolean
  data: CategoryResult[] | undefined
  select: {
    categoryId: number
    categoryName: string
  }
  setSelect: Dispatch<SetStateAction<CategoryResult>>
  placeholder?: string
}

const CategorySelectBox = ({ title, data, select, setSelect, essential, disabled, placeholder }: SelectBoxProps) => {
  return (
    <div className='mt-1 w-full'>
      {title ? (
        <span className='mb-2 block text-xs font-medium text-gray-700'>
          {essential && <span className={'text-red-500'}>*</span>}
          {title}
        </span>
      ) : null}
      <Listbox
        disabled={disabled}
        value={select}
        onChange={newValue => {
          if (newValue) {
            setSelect(newValue)
          }
        }}>
        <div className='relative mt-1'>
          <Listbox.Button
            className={cls(
              'relative w-full cursor-default rounded-md py-1.5 pl-3 pr-10 text-left text-sm leading-8 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-1 focus:ring-[#32D7A0]',
              disabled ? 'bg-[#eee]' : 'bg-white'
            )}
            placeholder={placeholder}>
            <span className='block truncate text-[13px]'>{select.categoryName}</span>
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
          </Listbox.Button>

          <Transition as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
            <Listbox.Options className='absolute z-30 mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {data?.map(value => (
                <Listbox.Option
                  key={value.categoryId}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-[#eee]' : ''}`
                  }
                  value={value}>
                  {({ selected }) => (
                    <>
                      <span className={`block truncate text-[13px] ${selected ? 'font-medium' : 'font-normal'}`}>
                        {value.categoryName}
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
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CategorySelectBox
