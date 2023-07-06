import React from 'react'
import uuid from 'react-uuid'

import { PositionType } from '@/app/(home)/(main)/places/dummyData'

const PreviewCard = ({ previews, onClick }: { previews: PositionType[]; onClick: () => void }) => {
  return (
    <div className={'mt-2 h-[200px] overflow-hidden py-2.5'}>
      {previews ? (
        <ul className={'flex h-[190px] flex-col items-center gap-2 overflow-x-hidden overflow-y-scroll'}>
          {previews.map(preview => {
            return (
              <li
                key={`${uuid()}_${preview.content}`}
                role='presentation'
                className={'w-full cursor-pointer rounded border p-4 text-xs hover:bg-[#eee]'}
                onClick={onClick}>
                {preview.content}
              </li>
            )
          })}
        </ul>
      ) : (
        <div className={'mt-4 flex h-[190px] items-center justify-center'}>
          <p className={'text-[13px]'}>범위에 존재하는 아이템이 없습니다.</p>
        </div>
      )}
    </div>
  )
}

export default PreviewCard
