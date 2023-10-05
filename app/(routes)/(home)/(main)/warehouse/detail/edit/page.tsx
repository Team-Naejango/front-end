'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Tab } from '@headlessui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'
import dynamic from 'next/dynamic'
import Loading from '@/app/loading'
import { toast } from 'react-hot-toast'
import { CHAT } from '@/app/libs/client/reactQuery/queryKey/chat'
import { ApiError } from 'next/dist/server/api-utils'

import Layout from '@/app/components/template/main/layout/Layout'
import RoundedTab from '@/app/components/molecule/tab/RoundedTab'
import FloatingButton from '@/app/components/atom/FloatingButton'
import ItemList from '@/app/components/organism/warehouse/ItemList'
import { CHAT_TYPE, CRUD, E_CHAT_TYPE, ITEM_TYPE, MODAL_TYPES } from '@/app/libs/client/constants/code'
import { ITEM, WAREHOUSE } from '@/app/libs/client/reactQuery/queryKey/warehouse'
import { modalSelector } from '@/app/store/modal'
import { useModal } from '@/app/hooks/useModal'
import MatchModal from '@/app/components/molecule/modal/MatchModal'
import Button from '@/app/components/atom/Button'
import UseCustomRouter from '@/app/hooks/useCustomRouter'
import { ChannelInfo, ItemMatchResult } from '@/app/apis/types/domain/warehouse/warehouse'
import { useSendNotification } from '@/app/hooks/useSendNotification'
import { OAUTH } from '@/app/libs/client/reactQuery/queryKey/auth'

import { storageGroupChannel, storageItem } from '@/app/apis/domain/warehouse/warehouse'
import { userInfo } from '@/app/apis/domain/profile/profile'
import { joinChat } from '@/app/apis/domain/chat/channel'
import { joinGroupChat } from '@/app/apis/domain/chat/chat'

const CustomModal = dynamic(() => import('@/app/components/molecule/modal/CustomModal'), {
  ssr: false,
  loading: () => <Loading />,
})

const ItemMatchModal = dynamic(() => import('@/app/components/organism/warehouse/ItemMatch'), {
  ssr: false,
  loading: () => <Loading />,
})

const WareHouseItem = () => {
  const searchParams = useSearchParams()
  const query = useQueryClient()
  const { openModal, closeModal } = useModal()
  const { push } = UseCustomRouter()
  const [selectedTab, setSelectedTab] = useState<string | string[]>([ITEM_TYPE.개인구매, ITEM_TYPE.공동구매])
  const [disabledPersonal, setDisabledPersonal] = useState<boolean>(false)
  const [disabledGroup, setDisabledGroup] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<ItemMatchResult | null>(null)
  const _match = useRecoilValue(modalSelector('match'))
  const _matchedItem = useRecoilValue(modalSelector('matchedItem'))
  const _chat = useRecoilValue(modalSelector('chat'))

  const storageId = searchParams.get('storage')
  const count = searchParams.get('count')
  const isMatch = searchParams.get('match')
  const matchItemId = searchParams.get('item')

  // 창고 아이템 조회
  const { data: { data: _itemInfo } = {} } = useQuery(
    [ITEM.조회, storageId],
    () =>
      storageItem({
        storageId: String(storageId),
        status: true,
        page: '0',
        size: '10',
      }),
    {
      enabled: !!storageId,
    }
  )

  // 아이템 필터링
  const filteredItemList =
    [...(_itemInfo?.result || [])].filter(item => {
      if (Array.isArray(selectedTab)) {
        return selectedTab.some(tab => tab === item.itemType)
      }
      return selectedTab === item.itemType
    }) || []

  // 창고 아이템 그룹 채널 조회
  const { data: { data: groupChat } = {} } = useQuery(
    [WAREHOUSE.그룹채널조회, selectedItem?.itemId],
    () => storageGroupChannel(String(selectedItem?.itemId)),
    {
      enabled: !!selectedItem,
    }
  )

  // 프로필 조회
  const { data: { data: mineInfo } = {} } = useQuery([OAUTH.유저정보], () => userInfo(), {
    enabled: !selectedItem,
  })

  // 브라우저 알림 전송
  const UseSendNotification = () => {
    const sendNotification = useSendNotification({
      myId: mineInfo?.result.userId,
      yourId: selectedItem?.ownerId,
      myNickname: mineInfo?.result.nickname,
      myImgUrl: selectedItem?.imgUrl,
    })

    return sendNotification
  }

  const sendNotification = useCallback(() => {
    UseSendNotification()
  }, [UseSendNotification])

  // 개인 채팅 개설
  const { mutate: mutateJoin } = useMutation(joinChat, {
    onSuccess: data => {
      toast.success('개인 채팅방 입장하였습니다.')
      sendNotification()
      query.invalidateQueries([CHAT.조회])
      push({
        pathname: '/chats/edit',
        query: {
          channel: data.data.result.channelId,
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
      sendNotification()
      query.invalidateQueries([CHAT.조회])
      push({
        pathname: '/chats/edit',
        query: {
          channel: data.data.result.channelId,
        },
      })
      // 이미 참여중인 채널인 경우 이미 채널에 참여중이라는 메세지와 함께 채팅방 edit 를 응답합니다.
      // 참여중이지 않은 채팅인 경우 채팅방의 정원을 확인하고 가득차 있지 않으면, 채팅방(Chat) 을 새로 생성하고 채널에 참여 합니다.
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // 탭 선택
  const onSelectedTab = (tab: string | string[]) => {
    const PERSONAL_OR_GROUP = ITEM_TYPE.개인구매 || ITEM_TYPE.공동구매

    if (tab.includes(PERSONAL_OR_GROUP) === selectedTab.includes(PERSONAL_OR_GROUP)) return

    setSelectedTab(() => {
      if (selectedTab.includes(PERSONAL_OR_GROUP)) {
        return ITEM_TYPE.개인판매
      }
      return [ITEM_TYPE.개인구매, ITEM_TYPE.공동구매]
    })
  }

  // 매칭된 아이템 선택 모달
  const onMatchCallback = () => {
    closeModal('match')

    openModal({
      modal: { id: 'matchedItem', type: MODAL_TYPES.ALERT },
    })
  }

  // 아이템 매칭 모달
  const onMatchShow = () => {
    openModal({
      modal: { id: 'match', type: MODAL_TYPES.DIALOG },
    })
  }

  // 채팅방 선택 모달
  const onSelectedChatModal = () => {
    if (!selectedItem) {
      toast.error('선택된 아이템이 없습니다.')
      closeModal('matchedItem')
      return false
    }

    const selectedItemType = selectedItem.itemType
    const isPersonal = selectedItemType === ITEM_TYPE.개인구매 || selectedItemType === ITEM_TYPE.개인판매

    if (isPersonal) {
      setDisabledGroup(true)
    } else if (selectedItemType === ITEM_TYPE.공동구매) {
      setDisabledPersonal(true)
    }

    openModal({
      modal: {
        id: 'chat',
        type: MODAL_TYPES.ALERT,
        title: '채팅방 선택',
      },
    })
  }

  useEffect(() => {
    closeModal('chat')
  }, [])

  useEffect(() => {
    if (isMatch) {
      onMatchShow()
    }
  }, [isMatch])

  // 채팅방 참여
  const selectedChatType = (type: E_CHAT_TYPE) => {
    if (!type) return closeModal('chat')

    if (type === CHAT_TYPE.개인) {
      mutateJoin(String(selectedItem!.ownerId))
    } else if (type === CHAT_TYPE.그룹) {
      if (groupChat?.result === null) {
        toast.error('등록된 그룹채팅이 없습니다. 다음에 다시 이용해주세요.')
        return closeModal('chat')
      }
      if (groupChat?.result?.participantsCount === groupChat?.result?.channelLimit) {
        toast.error('현재 채팅방 참여 인원수가 최대입니다. 다음에 다시 이용해주세요.')
        return closeModal('chat')
      }

      mutateGroupJoin(String(groupChat?.result.channelId))
      closeModal('chat')
    }
  }

  // todo: 삭제 팝업창과 delete api 추가
  const onDeleteItem = () => {}

  return (
    <Layout canGoBack title={`창고${Number(count) + 1}`}>
      <div className='mt-8'>
        <RoundedTab setSelectedTab={onSelectedTab}>
          <Tab.Panel>
            {selectedTab.includes(ITEM_TYPE.개인구매 || ITEM_TYPE.공동구매) &&
              (filteredItemList.length === 0 ? (
                <div className='flex h-[450px] items-center justify-center'>
                  <p className='text-sm'>존재하는 아이템이 없습니다.</p>
                </div>
              ) : (
                <ItemList
                  items={filteredItemList}
                  params={{ storageId: String(storageId), count: String(count) }}
                  onDelete={onDeleteItem}
                />
              ))}
          </Tab.Panel>
          <Tab.Panel>
            {selectedTab.includes(ITEM_TYPE.개인판매) &&
              (filteredItemList.length === 0 ? (
                <div className='flex h-[450px] items-center justify-center'>
                  <p className='text-sm'>존재하는 아이템이 없습니다.</p>
                </div>
              ) : (
                <ItemList
                  items={filteredItemList}
                  params={{ storageId: String(storageId), count: String(count) }}
                  onDelete={onDeleteItem}
                />
              ))}
          </Tab.Panel>
        </RoundedTab>
        <FloatingButton
          href={{
            pathname: '/warehouse/detail/item/edit',
            query: {
              crud: CRUD.등록,
              storage: storageId,
              count: count || '',
              item: null,
            },
          }}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='2'
            stroke='currentColor'
            className='h-6 w-6'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
          </svg>
        </FloatingButton>
      </div>

      {_match.modal.show ? (
        <CustomModal id={_match.modal.id} type={MODAL_TYPES.DIALOG}>
          <MatchModal id={_match.modal.id} onMatch={onMatchCallback} />
        </CustomModal>
      ) : null}

      {_matchedItem.modal.show ? (
        <CustomModal id={_matchedItem.modal.id} type={MODAL_TYPES.ALERT}>
          <div className={'h-[310px]'} />
          <ItemMatchModal
            itemId={matchItemId!}
            groupChatInfo={groupChat?.result as ChannelInfo}
            onSelect={item => setSelectedItem(item)}
          />
          <div className='mt-6 flex justify-center gap-4 text-center'>
            <Button text={'채팅신청'} onClick={onSelectedChatModal} />
            <Button cancel text={'닫기'} onClick={() => closeModal(_matchedItem.modal.id)} />
          </div>
        </CustomModal>
      ) : null}

      {_chat.modal.show ? (
        <CustomModal id={_chat.modal.id} type={MODAL_TYPES.ALERT}>
          <div className={'flex gap-4 py-2'}>
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
    </Layout>
  )
}

export default WareHouseItem
