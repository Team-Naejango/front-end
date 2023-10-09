'use client'

import React from 'react'

import { StorageInfo } from '@/app/apis/types/domain/warehouse/warehouse'

const SelectStorage = ({
  storageInfo,
  selectStorage,
  onSelectStorage,
}: {
  storageInfo: StorageInfo | undefined
  selectStorage: number | null
  onSelectStorage: (storageId: number, index: number) => void
}) => {
  return (
    <div className={'flex h-full flex-wrap items-center justify-center gap-4 py-2'}>
      {storageInfo?.result ? (
        storageInfo?.result.map((storage, idx) => {
          return (
            <button
              key={storage.storageId}
              className={`ml-2 whitespace-nowrap rounded-md border border-gray-300 px-4 py-2.5 text-[13px] font-medium text-[#222] shadow-sm hover:border-transparent hover:bg-[#33CC99] hover:text-[#fff] focus:outline-none ${
                selectStorage === storage.storageId ? `border-transparent bg-[#33CC99] text-[#fff]` : ''
              }`}
              onClick={() => onSelectStorage(storage.storageId, idx)}>
              {storage.name}
            </button>
          )
        })
      ) : (
        <span className={'text-sm'}>창고를 생성해주세요.</span>
      )}
    </div>
  )
}

export default SelectStorage
