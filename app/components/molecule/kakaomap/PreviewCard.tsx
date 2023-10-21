import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import uuid from 'react-uuid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { ApiError } from 'next/dist/server/api-utils'
import dynamic from 'next/dynamic'
import { AxiosError } from 'axios'
import { FormProvider, useForm } from 'react-hook-form'

import { useModal } from '@/app/hooks/useModal'
import Loading from '@/app/loading'
import { CHAT_TYPE, E_CHAT_TYPE, E_ITEM_TYPE, ITEM_TYPE, MODAL_TYPES } from '@/app/libs/client/constants/code'
import SelectCard from '@/app/components/molecule/kakaomap/SelectCard'
import { modalSelector } from '@/app/store/modal'
import { cls, formatCurrentIsoDate } from '@/app/libs/client/utils/util'
import { markerItemsState, activatedWareHouseTitleState, systemMessageState } from '@/app/store/atom'
import { FOLLOW } from '@/app/libs/client/reactQuery/queryKey/profile/follow'
import { Item, SearchCondition, Storages } from '@/app/apis/types/domain/warehouse/warehouse'
import Button from '@/app/components/atom/Button'
import { WAREHOUSE } from '@/app/libs/client/reactQuery/queryKey/warehouse'
import { CHAT, DEAL } from '@/app/libs/client/reactQuery/queryKey/chat'
import UseCustomRouter from '@/app/hooks/useCustomRouter'
import { OAUTH } from '@/app/libs/client/reactQuery/queryKey/auth'
import { ChatInfoList, GroupChat } from '@/app/apis/types/domain/chat/chat'
import { FormFields } from '@/app/components/organism/chat/MenuBox'
import Register from '@/app/components/organism/chat/Register'
import { TRANSACTION_MESSAGE } from '@/app/libs/client/constants/app/transaction'
import SelectChatList from '@/app/components/organism/place/SelectChatList'
import { ApiErrorData } from '@/app/apis/types/response/response'

import { DealParam, incompleteDeal, saveDeal as register } from '@/app/apis/domain/chat/deal'
import { follow, saveFollow, unFollow } from '@/app/apis/domain/profile/follow'
import { userInfo } from '@/app/apis/domain/profile/profile'
import { groupChatUserInfo, joinChat } from '@/app/apis/domain/chat/channel'
import { joinGroupChat } from '@/app/apis/domain/chat/chat'
import { storage, storageGroupChannel } from '@/app/apis/domain/warehouse/warehouse'

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
  setInfo: Dispatch<SetStateAction<SearchCondition | Storages | null>>
  setIsDragedMixture: Dispatch<SetStateAction<boolean>>
}

const PreviewCard = ({
  previews,
  dragedPreviews,
  isDragedMixture,
  activedItem,
  kakaoMap,
  setInfo,
  setIsDragedMixture,
}: PreviewCardProps) => {
  const query = useQueryClient()
  const { openModal, closeModal } = useModal()
  const { push } = UseCustomRouter()

  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [selectedChat, setSelectedChat] = useState<ChatInfoList | null>(null)
  const [disabledPersonal, setDisabledPersonal] = useState<boolean>(false)
  const [disabledGroup, setDisabledGroup] = useState<boolean>(false)
  const [traderId, setTraderId] = useState<number | undefined>(undefined)

  const [selectedTitle, setSelectedTitle] = useRecoilState<string>(activatedWareHouseTitleState)
  const setMarkerItemsValue = useSetRecoilState<{ name: string }[]>(markerItemsState)
  const setSystemMessage = useSetRecoilState<string | undefined>(systemMessageState)
  const _preview = useRecoilValue(modalSelector('preview'))
  const _selectChat = useRecoilValue(modalSelector('selectChat'))
  const _channel = useRecoilValue(modalSelector('channel'))
  const _register = useRecoilValue(modalSelector('register'))

  const formMethods = useForm<FormFields>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })
  const { watch } = formMethods

  // 창고 조회
  const { data: { data: storageInfo } = {} } = useQuery([WAREHOUSE.조회], () => storage(), {
    enabled: !isDragedMixture,
  })

  // 팔로우 조회
  const { data: { data: follows } = {} } = useQuery([FOLLOW.조회], () => follow(), {
    enabled: !isDragedMixture,
  })

  // 프로필 조회
  const { data: { data: mineInfo } = {} } = useQuery([OAUTH.유저정보], () => userInfo(), {
    enabled: !isDragedMixture,
  })

  const itemSellType = selectedItem?.itemType === ITEM_TYPE.개인판매
  const itemSellOwner = selectedItem?.ownerId === mineInfo?.result.userId

  // 창고 아이템 그룹 채널 조회
  const { data: { data: groupChat } = {} } = useQuery(
    [WAREHOUSE.그룹채널조회, selectedItem?.itemId],
    () => storageGroupChannel(String(selectedItem?.itemId)),
    {
      enabled: !!selectedItem?.itemId,
    }
  )

  // 미완료 거래 조회
  const { data: { data: incompleteInfo } = {}, refetch: refetchIncompleteInfo } = useQuery(
    [DEAL.미완료거래조회, traderId],
    () => incompleteDeal(String(traderId)),
    {
      enabled: !!traderId,
    }
  )

  // 거래 등록
  const { mutate: mutateRegister } = useMutation(register, {
    onSuccess: async data => {
      if (data.data.message !== TRANSACTION_MESSAGE.예약등록) {
        setSystemMessage(data.data.message)
      }
      await query.invalidateQueries({
        queryKey: [DEAL.조회, DEAL.미완료거래조회, DEAL.특정거래조회],
        refetchType: 'all',
      })
      push({
        pathname: '/chats/edit',
        query: {
          channel: selectedChat?.channelId,
        },
      })
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

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
    onSuccess: async data => {
      await query.invalidateQueries([CHAT.조회])
      push({
        pathname: '/chats/edit',
        query: {
          channel: data.data.result.channelId,
        },
      })
    },
    onError: (error: AxiosError) => {
      toast.error(error.message)
    },
  })

  // 그룹 채팅방 참여
  const { mutate: mutateGroupJoin } = useMutation(joinGroupChat, {
    onSuccess: async data => {
      toast.success('그룹 채팅방에 입장하였습니다.')
      await query.invalidateQueries([CHAT.조회])
      push({
        pathname: '/chats/edit',
        query: {
          channel: data.data.result.channelId,
        },
      })
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as ApiErrorData
      if (data.error === 'CONFLICT') {
        return toast.error(data.message)
      }

      if (error.response?.status === 409) {
        const data = error.response?.data as GroupChat
        toast.success(data.message)
        return push({
          pathname: '/chats/edit',
          query: {
            channel: data.result.channelId,
          },
        })
      }

      toast.error(error.message)
    },
  })

  // 프리뷰 창고목록 클릭 시
  const onClickPreview = (marker: SearchCondition | Storages) => {
    if (!marker) return

    setInfo(marker)
    const place = new window.kakao.maps.LatLng(Number(marker.coord.latitude), Number(marker.coord.longitude))
    kakaoMap && kakaoMap.panTo(place)
    setIsDragedMixture(true)
    setSelectedTitle(marker.name)
  }

  // 개인 채팅 방장 여부
  const personalManager = useCallback(async () => {
    if (selectedChat?.channelId) {
      const membersInfo = await groupChatUserInfo(String(selectedChat?.channelId))

      const getTraderId = membersInfo.data.result?.find(value => {
        return value.participantId !== mineInfo?.result?.userId
      })?.participantId
      setTraderId(getTraderId)
    }
  }, [mineInfo?.result?.userId, selectedChat?.channelId])

  // 창고 아이템 선택 모달
  const onClickShowModal = (name: string) => {
    setSelectedTitle(name)

    personalManager()

    openModal({
      modal: { id: 'preview', type: MODAL_TYPES.CONFIRM },
    })

    setMarkerItemsValue(
      dragedPreviews.map(data => ({
        name: data.name,
      }))
    )
  }

  // 채팅방 선택 모달
  const onSelectChatModal = () => {
    if (selectedItem?.itemType === ITEM_TYPE.공동구매) return toast.error('공동구매는 거래를 이용하실 수 없습니다.')

    openModal({
      modal: {
        id: 'selectChat',
        type: MODAL_TYPES.ALERT,
        title: '채팅방 선택',
      },
    })
  }

  // 거래등록 모달
  const registerDeal = useCallback(async () => {
    await refetchIncompleteInfo()

    openModal({
      modal: { id: 'register', type: MODAL_TYPES.CONFIRM },
      callback: () => {
        if (watch('amount') <= 0) return toast.error('최소 금액을 입력해주세요.')

        const omitCommaAmount = String(watch('amount')).replace(/,/g, '')

        if (incompleteInfo?.result && incompleteInfo.result.length > 0) {
          toast.error('이미 진행중인 거래가 존재합니다.')
          closeModal('selectChat')
        } else {
          const params: DealParam = {
            date: formatCurrentIsoDate(),
            amount: Number(omitCommaAmount),
            traderId: traderId!,
            itemId: selectedItem?.itemId!,
          }

          mutateRegister(params)
        }
      },
    })
  }, [traderId])

  // 거래 ID 바인딩
  useEffect(() => {
    personalManager()
  }, [personalManager])

  // 거래 ID가 있다면 거래등록 모달 오픈
  useEffect(() => {
    if (traderId) {
      registerDeal()
    }
  }, [traderId, registerDeal])

  // 채팅방 선택 시
  const onSelectChat = (chat: ChatInfoList) => {
    if (!chat) return

    setSelectedChat(chat)
    registerDeal()
  }

  // 개인/그룹 채널 선택 모달
  const onSelectChannelModal = () => {
    openModal({
      modal: {
        id: 'channel',
        type: MODAL_TYPES.ALERT,
        title: '채널 선택',
      },
      callback: () => {
        setDisabledGroup(false)
        setDisabledPersonal(false)
      },
    })
  }

  // 채팅 신청
  const onRegisterChat = (type: E_ITEM_TYPE, ownerId: number) => {
    if (mineInfo?.result.userId === ownerId)
      return toast.error('회원님의 창고 아이템입니다. \n 다른 창고를 선택해주세요.')

    const isPersonal = type === ITEM_TYPE.개인구매 || type === ITEM_TYPE.개인판매

    if (isPersonal) {
      setDisabledGroup(true)
    } else if (type === ITEM_TYPE.공동구매) {
      setDisabledPersonal(true)
    }
    onSelectChannelModal()
  }

  // 팔로우 구독/취소
  const onClickFollow = (storageId: number) => {
    if (!storageId) return
    const isMyStorage = storageInfo?.result.some(v => v.storageId === storageId)
    if (isMyStorage) return toast.error('회원님의 창고입니다. \n 다른 창고를 선택해주세요.')

    const isSubscribe = follows && follows.result.some(v => v.id === storageId)
    isSubscribe ? mutateUnfollow(String(storageId)) : mutateFollow(String(storageId))
  }

  // 채팅방 참여
  const selectedChatType = (type: E_CHAT_TYPE) => {
    if (!type) return

    if (type === CHAT_TYPE.개인) {
      const ownerId = dragedPreviews?.find(v => v.ownerId)?.ownerId

      if (mineInfo?.result.userId === ownerId)
        return toast.error('회원님의 창고 아이템입니다. \n 다른 창고를 선택해주세요.')

      mutateJoin(String(ownerId))
    } else if (type === CHAT_TYPE.그룹) {
      if (!groupChat) {
        toast.error('등록된 그룹채팅이 없습니다. \n 다음에 다시 이용해주세요.')
        return closeModal('channel')
      }

      closeModal('channel')
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
                        onClick={() => {
                          setSelectedItem({ ...item })
                          onClickShowModal(item.name || selectedTitle)
                        }}>
                        <span
                          className={cls(
                            'mr-1.5 rounded px-1 py-1 text-[10px] text-white',
                            item.itemType === ITEM_TYPE.개인판매 ? 'bg-[#A3D139]' : 'bg-[#30BD81] !px-1.5'
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

      {_preview.modal.show ? (
        <CustomModal id={_preview.modal.id}>
          <SelectCard
            title={activedItem === '' ? selectedTitle : activedItem}
            dragedPreviews={dragedPreviews}
            isDragedMixture={isDragedMixture}
          />
          <div className='mt-6 flex justify-center gap-4 text-center'>
            <Button
              disabled={!(itemSellType && itemSellOwner)}
              small
              text={'거래신청'}
              className={'flex-1'}
              onClick={onSelectChatModal}
            />
            <Button
              text={'채팅신청'}
              className={'flex-1'}
              onClick={() => onRegisterChat(selectedItem?.itemType!, selectedItem?.ownerId!)}
            />
            <Button cancel text={'닫기'} className={'flex-1'} onClick={() => closeModal('preview')} />
          </div>
        </CustomModal>
      ) : null}

      {_selectChat.modal.show ? (
        <CustomModal id={_selectChat.modal.id} type={MODAL_TYPES.DIALOG}>
          <SelectChatList selectItem={selectedItem} selectedChat={selectedChat} onSelectChat={onSelectChat} />
        </CustomModal>
      ) : null}

      {_register.modal.show ? (
        <FormProvider {...formMethods}>
          <CustomModal id={_register.modal.id} type={MODAL_TYPES.CONFIRM} btn btnTxt={'등록'}>
            <Register userInfo={mineInfo?.result || null} selectedChat={selectedChat} />
          </CustomModal>
        </FormProvider>
      ) : null}

      {_channel.modal.show ? (
        <CustomModal id={_channel.modal.id} type={MODAL_TYPES.ALERT}>
          <div className={'flex gap-2 py-2'}>
            <Button
              small
              disabled={disabledPersonal}
              text={'개인 채팅'}
              className={'!py-2'}
              onClick={() => selectedChatType(CHAT_TYPE.개인)}
            />
            <Button
              small
              disabled={disabledGroup}
              text={'그룹 채팅'}
              className={'!py-2'}
              onClick={() => selectedChatType(CHAT_TYPE.그룹)}
            />
          </div>
        </CustomModal>
      ) : null}
    </>
  )
}

export default PreviewCard
