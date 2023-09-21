import React, { Dispatch, SetStateAction } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import uuid from 'react-uuid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { ApiError } from 'next/dist/server/api-utils'
import dynamic from 'next/dynamic'

import { useModal } from '@/app/hooks/useModal'
import Loading from '@/app/loading'
import { CHAT_TYPE, E_CHAT_TYPE, E_ITEM_TYPE, ITEM_TYPE, MODAL_TYPES } from '@/app/libs/client/constants/code'
import CardSelectModal from '@/app/components/molecule/kakaomap/CardSelectModal'
import { modalSelector } from '@/app/store/modal'
import { cls } from '@/app/libs/client/utils/util'
import { markerItemsState, activatedWareHouseTitleState } from '@/app/store/atom'
import { FOLLOW } from '@/app/libs/client/reactQuery/queryKey/profile/follow'
import { Item, SearchCondition, Storages } from '@/app/apis/types/domain/warehouse/warehouse'
import Button from '@/app/components/atom/Button'
import { WAREHOUSE } from '@/app/libs/client/reactQuery/queryKey/warehouse'
import { CHAT } from '@/app/libs/client/reactQuery/queryKey/chat'
import UseCustomRouter from '@/app/hooks/useCustomRouter'

import { follow, saveFollow, unFollow } from '@/app/apis/domain/profile/follow'
import { joinChat } from '@/app/apis/domain/chat/channel'
import { joinGroupChat } from '@/app/apis/domain/chat/chat'
import { storageGroupChannel } from '@/app/apis/domain/warehouse/warehouse'

/* global kakao, maps */

const CustomModal = dynamic(() => import('@/app/components/molecule/modal/CustomModal'), {
  ssr: false,
  loading: () => <Loading />,
})

interface PreviewCardProps {
  previews: SearchCondition[] | Storages[]
  dragedPreviews: Item[]
  isDragedMixture: boolean
  activedItem: string
  kakaoMap: kakao.maps.Map | null
  info: SearchCondition | Storages | null
  setInfo: Dispatch<SetStateAction<SearchCondition | Storages | null>>
  setIsDragedMixture: Dispatch<SetStateAction<boolean>>
}

const PreviewCard = ({
  previews,
  dragedPreviews,
  isDragedMixture,
  activedItem,
  kakaoMap,
  info,
  setInfo,
  setIsDragedMixture,
}: PreviewCardProps) => {
  const query = useQueryClient()
  const { openModal } = useModal()
  const { push } = UseCustomRouter()
  const previewState = useRecoilValue(modalSelector('preview'))
  const chatState = useRecoilValue(modalSelector('chat'))
  const setMarkerItemsValue = useSetRecoilState<{ name: string }[]>(markerItemsState)
  const [selectedTitle, setSelectedTitle] = useRecoilState<string>(activatedWareHouseTitleState)

  // 팔로우 조회
  const { data: { data: follows } = {} } = useQuery([FOLLOW.조회], () => follow(), {
    enabled: !isDragedMixture,
  })

  // 창고 아이템 그룹 채널 조회
  const { data: { data: groupChat } = {} } = useQuery(
    [WAREHOUSE.그룹채널조회, info],
    () => storageGroupChannel(String(info!.storageId)),
    {
      enabled: !isDragedMixture && !!info,
    }
  )

  // 팔로우 등록
  const { mutate: mutateFollow } = useMutation(saveFollow, {
    onSuccess: () => {
      toast.success('팔로우 성공하였습니다.')
      query.invalidateQueries([FOLLOW.조회])
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // 팔로우 취소
  const { mutate: mutateUnfollow } = useMutation(unFollow, {
    onSuccess: () => {
      toast.success('팔로우 취소하였습니다.')
      query.invalidateQueries([FOLLOW.조회])
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // 개인 채팅 개설
  const { mutate: mutateJoin } = useMutation(joinChat, {
    onSuccess: data => {
      toast.success('개인 채팅방 입장하였습니다.')
      query.invalidateQueries([CHAT.조회])
      push({
        pathname: '/chats/edit',
        query: {
          id: data.data.result.channelId,
        },
      })
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // 그룹 채팅방 참여
  const { mutate: mutateGroupJoin } = useMutation(joinGroupChat, {
    onSuccess: data => {
      toast.success('그룹 채팅방에 입장하였습니다.')
      query.invalidateQueries([CHAT.조회])
      push({
        pathname: '/chats/edit',
        query: {
          id: data.data.result.channelId,
        },
      })
      // 이미 참여중인 채널인 경우 이미 채널에 참여중이라는 메세지와 함께 채팅방 edit 를 응답합니다.
      // 참여중이지 않은 채팅인 경우 채팅방의 정원을 확인하고 가득차 있지 않으면, 채팅방(Chat) 을 새로 생성하고 채널에 참여 합니다.
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // 채팅방 선택 모달
  const onSelectedChatModal = () => {
    openModal({
      modal: {
        id: 'chat',
        type: MODAL_TYPES.ALERT,
        title: '채팅방 선택',
      },
    })
  }

  // 창고 아이템 선택 모달
  const onClickShowModal = (value: string) => {
    setSelectedTitle(value)
    openModal({
      modal: { id: 'preview', type: MODAL_TYPES.CONFIRM },
      callback: () => {
        onSelectedChatModal()
      },
    })
    setMarkerItemsValue(
      dragedPreviews.map(data => ({
        name: data.name,
      }))
    )
  }

  // 프리뷰 창고목록 클릭 시
  const onClickPreview = (marker: SearchCondition | Storages) => {
    if (!marker) return

    setInfo(marker)
    const place = new window.kakao.maps.LatLng(Number(marker.coord.latitude), Number(marker.coord.longitude))
    kakaoMap && kakaoMap.panTo(place)
    setIsDragedMixture(true)
    setSelectedTitle(marker.name)
  }

  // 팔로우 구독/취소
  const onClickFollow = (storageId: number) => {
    if (!storageId) return

    const isSubscribe = follows && follows.result.some(v => v.id === storageId)
    isSubscribe ? mutateUnfollow(String(storageId)) : mutateFollow(String(storageId))
  }

  // 채팅방 참여
  const selectedChatType = (type: E_CHAT_TYPE) => {
    if (!type) return

    if (type === CHAT_TYPE.개인) {
      const { ownerId } = dragedPreviews.find(v => v.ownerId)!
      mutateJoin(String(ownerId))
    } else if (type === CHAT_TYPE.그룹) {
      if (!groupChat) return toast.error('등록된 그룹채팅이 없습니다.')

      mutateGroupJoin(String(groupChat?.result.channelId))
    }
  }

  // 아이템 타입 변환기
  const convertedItemTypeNm = (type: E_ITEM_TYPE) => {
    let itemTypeNm: string = ''

    if (type === ITEM_TYPE.개인구매) {
      itemTypeNm = '개인구매'
    } else if (type === ITEM_TYPE.개인판매) {
      itemTypeNm = '개인판매'
    } else if (type === ITEM_TYPE.공동구매) {
      itemTypeNm = '공동구매'
    }

    return itemTypeNm
  }

  return (
    <>
      <div className={'mt-2 h-[200px] overflow-hidden py-2'}>
        {!isDragedMixture && previews.length === 0 ? (
          <div className={'flex h-[190px] items-center justify-center rounded border'}>
            <p className={'text-[13px]'}>범위에 존재하는 아이템이 없습니다.</p>
          </div>
        ) : (
          <ul
            className={cls(
              'flex h-[190px] flex-col items-center gap-2 overflow-x-hidden overflow-y-scroll rounded border'
            )}>
            {isDragedMixture ? (
              dragedPreviews.length === 0 ? (
                <div className={'flex h-[190px] w-full items-center justify-center'}>
                  <p className={'text-[13px]'}>등록된 아이템이 없습니다.</p>
                </div>
              ) : (
                dragedPreviews?.map(item => {
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
                        onClick={() => onClickShowModal(item.name || selectedTitle)}>
                        <span
                          className={cls(
                            'mr-1.5 rounded px-1 py-1 text-[10px] text-white',
                            item.itemType === (ITEM_TYPE.개인구매 || ITEM_TYPE.공동구매)
                              ? 'bg-[#30BD81] !px-1.5'
                              : 'bg-[#A3D139]'
                          )}>
                          {convertedItemTypeNm(item.itemType)}
                        </span>
                        {item.name}
                      </div>
                    </li>
                  )
                })
              )
            ) : (
              previews?.map(item => {
                return (
                  <li
                    key={`${uuid()}_${item.storageId}`}
                    className={cls(
                      'relative w-full cursor-pointer rounded border text-xs hover:bg-[#eee]',
                      isDragedMixture ? '' : 'flex justify-between'
                    )}>
                    <div role='presentation' className={'w-full p-4'} onClick={() => onClickPreview(item)}>
                      {item.name}
                    </div>
                    <span
                      role={'presentation'}
                      className={'absolute right-5 top-1/2 -translate-y-1/2 text-[#33CC99]'}
                      onClick={() => onClickFollow(item.storageId)}>
                      <svg
                        className='h-4 w-4'
                        fill={follows?.result.some(follow => follow.id === item.storageId) ? '#33CC99' : 'none'}
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
              })
            )}
          </ul>
        )}
        )
      </div>

      {previewState.modal.show ? (
        <CustomModal id={previewState.modal.id} btn btnTxt={'채팅신청'}>
          <CardSelectModal
            title={activedItem === '' ? selectedTitle : activedItem}
            dragedPreviews={dragedPreviews}
            isDragedMixture={isDragedMixture}
          />
        </CustomModal>
      ) : null}

      {chatState.modal.show ? (
        <CustomModal id={chatState.modal.id} type={MODAL_TYPES.ALERT}>
          <div className={'flex gap-4 py-2'}>
            <Button small text={'개인 채팅'} className={'!py-2'} onClick={() => selectedChatType(CHAT_TYPE.개인)} />
            <Button small text={'그룹 채팅'} className={'!py-2'} onClick={() => selectedChatType(CHAT_TYPE.그룹)} />
          </div>
        </CustomModal>
      ) : null}
    </>
  )
}

export default PreviewCard
