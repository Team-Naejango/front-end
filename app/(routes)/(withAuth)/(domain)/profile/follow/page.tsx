'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { toast } from 'react-hot-toast'
import { ApiError } from 'next/dist/server/api-utils'

import Layout from '@/app/components/template/main/layout/Layout'
import Loading from '@/app/loading'
import Button from '@/app/components/atom/Button'
import { useModal } from '@/app/hooks/useModal'
import { cls } from '@/app/libs/client/utils/util'
import { modalSelector } from '@/app/store/modal'
import { E_ITEM_TYPE, ITEM_TYPE, MODAL_TYPES } from '@/app/libs/client/constants/code'
import FollowUserItem from '@/app/components/organism/profile/follow/FollowUserItem'
import { FOLLOW } from '@/app/libs/client/reactQuery/queryKey/profile/follow'
import { FollowResult } from '@/app/apis/types/domain/profile/follow'
import { WISH } from '@/app/libs/client/reactQuery/queryKey/profile/wish'

import { follow, unFollow } from '@/app/apis/domain/profile/follow'
import { saveWish, unWish, wish } from '@/app/apis/domain/profile/wish'

const CustomModal = dynamic(() => import('@/app/components/molecule/modal/CustomModal'), {
  ssr: false,
  loading: () => <Loading />,
})

const Follow = () => {
  const query = useQueryClient()
  const { openModal, closeModal } = useModal()
  const [selectedStorage, setSelectedStorage] = useState<FollowResult | null>(null)
  const _follow = useRecoilValue(modalSelector('itemsOfFollow'))

  // 팔로우 조회
  const { data: { data: follows } = {} } = useQuery([FOLLOW.조회], () => follow())

  // 관심 조회
  const { data: { data: wishs } = {} } = useQuery([WISH.조회], () => wish())

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

  // 관심 등록
  const { mutate: mutateWish } = useMutation(saveWish, {
    onSuccess: () => {
      toast.success('관심목록에 추가하였습니다.')
      query.invalidateQueries([WISH.조회])
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // 관심 삭제
  const { mutate: mutateUnWish } = useMutation(unWish, {
    onSuccess: () => {
      toast.success('관심목록에서 삭제되었습니다.')
      query.invalidateQueries([WISH.조회])
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  const onClickUnFollow = (storageId: number) => {
    if (!storageId) return

    mutateUnfollow(String(storageId))
  }

  // 관심 구독/취소
  const onClickWish = (itemId: number) => {
    if (!itemId) return

    const isSubscribe = wishs && wishs.result.some(v => v.id === itemId)
    isSubscribe ? mutateUnWish(String(itemId)) : mutateWish(String(itemId))
  }

  // 상세 모달
  const onClickReadMore = (storage: FollowResult) => {
    setSelectedStorage(storage)

    openModal({
      modal: { id: 'itemsOfFollow', type: MODAL_TYPES.ALERT },
    })
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
    <Layout canGoBack title='팔로우'>
      <div className={'mt-6'}>
        {follows?.result?.length === 0 ? (
          <div className={'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'}>
            <p className={'text-[15px]'}>팔로우 목록이 없습니다.</p>
          </div>
        ) : (
          follows?.result.map(follow => {
            return (
              <div key={follow.id} className='border-b py-6'>
                <div className='mb-3 flex cursor-pointer items-center space-x-3 px-2 pb-3'>
                  <div className={'flex w-full items-center justify-between'}>
                    <div className={'flex items-center justify-center gap-2'}>
                      <Image
                        key={follow.imgUrl}
                        src={`https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/upload/warehouse/${encodeURIComponent(
                          follow.imgUrl
                        )}`}
                        width={'100'}
                        height={'100'}
                        alt='창고 이미지'
                        className={'h-10 w-10 rounded-full border border-[#ccc] object-cover'}
                      />
                      <p className='text-[13px] font-medium'>{follow.name}</p>
                    </div>
                    <Link href={'/profile/follow'}>
                      <Button
                        small
                        text={'팔로우 취소'}
                        className={
                          '!rounded-2xl !border-[#32D7A0] !bg-white !py-2 text-xs !text-[#222] hover:!bg-[#32D7A0] hover:!text-white'
                        }
                        onClick={() => onClickUnFollow(follow.id)}
                      />
                    </Link>
                  </div>
                </div>
                <div className={'flex items-center gap-2 px-2'}>
                  {follow.items.slice(0, 3).map(item => {
                    return (
                      <div key={item.itemId} className={'relative'}>
                        <Image
                          key={item.imgUrl}
                          src={`https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/upload/item/${encodeURIComponent(
                            item.imgUrl
                          )}`}
                          width={'100'}
                          height={'100'}
                          alt='아이템 이미지'
                          className={'h-24 w-24 rounded border border-[#ddd] object-cover'}
                        />
                        <span
                          role={'presentation'}
                          className={'absolute right-1 top-1 z-10 cursor-pointer text-[#33CC99]'}
                          onClick={() => onClickWish(item.itemId)}>
                          <svg
                            className='h-5 w-5'
                            fill={wishs?.result.some(v => v.id === item?.itemId) ? '#33CC99' : 'none'}
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.5'
                              d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                            />
                          </svg>
                        </span>

                        {/* hover */}
                        <div className='absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-md bg-black bg-opacity-50 opacity-0 transition-opacity hover:opacity-100'>
                          <div className={'flex h-full flex-col items-center justify-center gap-0.5 text-center'}>
                            <span
                              className={cls(
                                'rounded px-1 py-1 text-[10px] text-white',
                                item.itemType === ITEM_TYPE.개인판매 ? 'bg-[#A3D139]' : 'bg-[#30BD81] !px-1.5'
                              )}>
                              {convertedItemTypeNm(item.itemType)}
                            </span>
                            <span className={'text-xs text-white'}>{item.name}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <button className={'ml-1 whitespace-nowrap hover:underline'} onClick={() => onClickReadMore(follow)}>
                    &rarr;
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>

      {_follow.modal.show ? (
        <CustomModal id={_follow.modal.id} type={MODAL_TYPES.ALERT}>
          <FollowUserItem
            items={follows?.result.find(v => v.id === selectedStorage?.id)?.items || []}
            wishs={wishs?.result || []}
            onWish={onClickWish}
          />
          <div className={'mt-4 text-center'}>
            <Button small text={'확인'} className={'!flex-grow-0 !py-2'} onClick={() => closeModal(_follow.modal.id)} />
          </div>
        </CustomModal>
      ) : null}
    </Layout>
  )
}

export default Follow
