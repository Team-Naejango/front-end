import React, { useState } from 'react'
import { useRecoilState } from 'recoil'

import SelectBox from '@/app/components/atom/SelectBox'
import { KEEP_TYPES } from '@/app/libs/client/constants/warehouse'

const CardSelectModal = ({ item, onClose }: { item: string; onClose: () => void }) => {
  const [selectedType, setSelectedType] = useState<{ name: string }>(KEEP_TYPES[0])

  return (
    <>
      <div className={'mb-4 text-center'}>
        <span className={'text-sm'}>{item}</span>
      </div>
      <SelectBox title={'분류'} data={KEEP_TYPES} selected={selectedType} setSelected={setSelectedType} essential />
      <div className='mt-4 flex justify-center gap-6 text-center'>
        <button
          type='button'
          className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-500 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
          onClick={() => {}}>
          교환신청
        </button>
        <button
          type='button'
          className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-500 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
          onClick={onClose}>
          취소
        </button>
      </div>
    </>
  )
}

export default CardSelectModal
