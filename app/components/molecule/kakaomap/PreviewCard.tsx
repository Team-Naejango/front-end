import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import uuid from 'react-uuid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { ApiError } from 'next/dist/server/api-utils'
import dynamic from 'next/dynamic'

import { useModal } from '@/app/hooks/useModal'
import Loading from '@/app/loading'
import { MODAL_TYPES } from '@/app/libs/client/constants/code'
import { positions } from '@/app/(routes)/(home)/(main)/places/dummyData'
import CardSelectModal from '@/app/components/molecule/kakaomap/CardSelectModal'
import { modalSelector } from '@/app/store/modal'
import { cls } from '@/app/libs/client/utils/util'
import { markerItemsState, activatedWareHouseTitleState } from '@/app/store/atom'
import { FOLLOW } from '@/app/libs/client/reactQuery/queryKey/profile/follow'
import { Item, Storages } from '@/app/apis/types/domain/warehouse/warehouse'

import { follow, saveFollow, unFollow } from '@/app/apis/domain/profile/follow'

const CustomModal = dynamic(() => import('@/app/components/molecule/modal/CustomModal'), {
  ssr: false,
  loading: () => <Loading />,
})

interface PreviewCardProps {
  previews: [Storages]
  dragedPreviews: Item[]
  isDragedMixture: boolean
  activedItem: string
}

const PreviewCard = ({ previews, dragedPreviews, isDragedMixture, activedItem }: PreviewCardProps) => {
  const query = useQueryClient()
  const modalState = useRecoilValue(modalSelector('Preview'))
  const { openModal, closeModal } = useModal()
  const [markerItemsValue, setMarkerItemsValue] = useRecoilState<{ name: any }[]>(markerItemsState)
  const [wareHouseTitleValue, setWareHouseTitleValue] = useRecoilState<string>(activatedWareHouseTitleState)

  console.log('isDragedMixture:', isDragedMixture)

  // 팔로우 조회
  const { data: { data: follows } = {} } = useQuery([FOLLOW.조회], () => follow(), {
    enabled: !isDragedMixture,
  })

  // 팔로우 등록
  const { mutate: mutateFollow } = useMutation(saveFollow, {
    onSuccess: () => {
      query.invalidateQueries([FOLLOW.조회])
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // 팔로우 취소
  const { mutate: mutateUnfollow } = useMutation(unFollow, {
    onSuccess: () => {
      query.invalidateQueries([FOLLOW.조회])
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

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

  const onClickFollow = (storageId: number) => {
    if (!storageId) return

    const isSubscribe = follows && follows.some(v => v.id === storageId)
    isSubscribe ? mutateUnfollow(String(storageId)) : mutateFollow(String(storageId))
  }

  console.log('follows:', follows)

  return (
    <>
      <div className={'mt-2 h-[200px] overflow-hidden py-2.5'}>
        {previews ? (
          <ul className={'flex h-[190px] flex-col items-center gap-2 overflow-x-hidden overflow-y-scroll'}>
            {isDragedMixture
              ? dragedPreviews?.map(item => {
                  return (
                    <li
                      key={`${uuid()}_${item.itemId}`}
                      className={cls(
                        'relative w-full cursor-pointer rounded border text-xs hover:bg-[#eee]',
                        isDragedMixture ? '' : 'flex justify-between'
                      )}>
                      <div
                        role='presentation'
                        className={'w-full p-4'}
                        onClick={() => onClickShowModal(item.name ?? wareHouseTitleValue)}>
                        <span
                          className={cls(
                            'mr-1.5 rounded px-1 py-1 text-[10px] text-white',
                            item.type === 'BUY' ? 'bg-[#30BD81] !px-1.5' : 'bg-[#A3D139]'
                          )}>
                          {item.type}
                        </span>
                        {item.name}
                      </div>
                    </li>
                  )
                })
              : previews?.map(item => {
                  return (
                    <li
                      key={`${uuid()}_${item.id}`}
                      className={cls(
                        'relative w-full cursor-pointer rounded border text-xs hover:bg-[#eee]',
                        isDragedMixture ? '' : 'flex justify-between'
                      )}>
                      <div
                        role='presentation'
                        className={'w-full p-4'}
                        onClick={() => onClickShowModal(item.name ?? wareHouseTitleValue)}>
                        {item.name}
                      </div>
                      <span
                        role={'presentation'}
                        className={'absolute right-5 top-1/2 -translate-y-1/2 text-[#33CC99]'}
                        onClick={() => onClickFollow(item.id)}>
                        <svg
                          className='h-4 w-4'
                          fill={follows?.some(follow => follow.id === item.id) ? '#33CC99' : 'none'}
                          stroke='currentColor'
                          viewBox='0 0 22 22'
                          xmlns='http://www.w3.org/2000/svg'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                          />
                        </svg>
                      </span>
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
