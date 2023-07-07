import React, { useState } from 'react'
import uuid from 'react-uuid'
import { useRecoilValue } from 'recoil'

import { useModal } from '@/app/hooks/useModal'
import { MODAL_TYPES } from '@/app/libs/client/constants/code'
import { PositionType } from '@/app/(home)/(main)/places/dummyData'
import CardSelectModal from '@/app/(home)/(main)/places/CardSelectModal'
import { modalSelector } from '@/app/store/modal'
import CustomModal from '@/app/components/molecule/modal/CustomModal'

const PreviewCard = ({ previews }: { previews: PositionType[] }) => {
  const [activeItem, setActiveItem] = useState<string>('')
  const modalState = useRecoilValue(modalSelector('previewModal'))
  const { openModal, closeModal } = useModal()

  const onClickModal = (value: string) => {
    openModal({
      modal: { id: 'previewModal', type: MODAL_TYPES.Modal },
      callback: () => {
        console.log('test')
      },
    })
    setActiveItem(value)
  }

  console.log('activeItem:', activeItem)

  return (
    <>
      <div className={'mt-2 h-[200px] overflow-hidden py-2.5'}>
        {previews ? (
          <ul className={'flex h-[190px] flex-col items-center gap-2 overflow-x-hidden overflow-y-scroll'}>
            {previews.map(preview => {
              return (
                <li
                  key={`${uuid()}_${preview.content}`}
                  role='presentation'
                  className={'w-full cursor-pointer rounded border p-4 text-xs hover:bg-[#eee]'}
                  onClick={() => onClickModal(preview.content ?? '')}>
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

      {modalState.modal.show ? (
        <CustomModal id={modalState.modal.id}>
          <CardSelectModal item={activeItem} onClose={() => closeModal(modalState.modal.id)} />
        </CustomModal>
      ) : null}
    </>
  )
}

export default PreviewCard
