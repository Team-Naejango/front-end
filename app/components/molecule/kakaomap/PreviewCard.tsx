import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import uuid from 'react-uuid'
import { toast } from 'react-hot-toast'

import { useModal } from '@/app/hooks/useModal'
import { MODAL_TYPES } from '@/app/libs/client/constants/code'
import { positions, PositionType } from '@/app/(home)/(main)/places/dummyData'
import CardSelectModal from '@/app/components/molecule/kakaomap/CardSelectModal'
import { modalSelector } from '@/app/store/modal'
import CustomModal from '@/app/components/molecule/modal/CustomModal'
import { cls } from '@/app/libs/client/utils/util'
import { markerItemsState, activatedWareHouseTitleState } from '@/app/store/atom'

interface PreviewCardProps {
  previews: PositionType[]
  isDragedMixture: boolean
  activedItem: string
}

const PreviewCard = ({ previews, isDragedMixture, activedItem }: PreviewCardProps) => {
  const modalState = useRecoilValue(modalSelector('Preview'))
  const { openModal, closeModal } = useModal()
  const [markerItemsValue, setMarkerItemsValue] = useRecoilState<{ name: any }[]>(markerItemsState)
  const [wareHouseTitleValue, setWareHouseTitleValue] = useRecoilState<string>(activatedWareHouseTitleState)

  const onClickShowModal = (value: string) => {
    setWareHouseTitleValue(value)
    openModal({
      modal: { id: 'Preview', type: MODAL_TYPES.CONFIRM },
      callback: () => {
        toast.success('교환신청이 완료되었습니다.')
      },
    })
    // setMarkerItemsValue([{ name: previews.map(data => data.content) }])
    setMarkerItemsValue(
      positions.map(data => ({
        name: data.content,
      }))
    )
  }

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
                  onClick={() => onClickShowModal(preview.content ?? wareHouseTitleValue)}>
                  {isDragedMixture ? (
                    <span
                      className={cls(
                        'mr-1.5 rounded px-1 py-1 text-[10px] text-white',
                        preview.data?.swap === 'BUY' ? 'bg-[#30BD81] !px-1.5' : 'bg-[#A3D139]'
                      )}>
                      {preview.data?.swap}
                    </span>
                  ) : null}
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
        <CustomModal id={modalState.modal.id} btn btnTxt={'교환신청'}>
          <CardSelectModal
            title={activedItem === '' ? wareHouseTitleValue : activedItem}
            isDragedMixture={isDragedMixture}
            onClose={() => closeModal(modalState.modal.id)}
          />
        </CustomModal>
      ) : null}
    </>
  )
}

export default PreviewCard
