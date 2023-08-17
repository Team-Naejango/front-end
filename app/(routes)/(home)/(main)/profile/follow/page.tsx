'use client'

import React from 'react'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { ApiError } from 'next/dist/server/api-utils'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { revalidatePath } from 'next/cache'

import Layout from '@/app/components/template/main/layout/Layout'
import Button from '@/app/components/atom/Button'
import { useModal } from '@/app/hooks/useModal'
import { modalSelector } from '@/app/store/modal'
import { MODAL_TYPES } from '@/app/libs/client/constants/code'
import Loading from '@/app/loading'
import FollowUserItemPopup from '@/app/components/organism/profile/FollowUserItemPopup'
import { FOLLOW } from '@/app/libs/client/reactQuery/queryKey/profile/follow'

import { follow, unFollow } from '@/app/apis/domain/profile/follow'

const CustomModal = dynamic(() => import('@/app/components/molecule/modal/CustomModal'), {
  ssr: false,
  loading: () => <Loading />,
})

const Follow = () => {
  const query = useQueryClient()
  const router = useRouter()
  const { openModal } = useModal()
  const _follow = useRecoilValue(modalSelector('itemsOfFollow'))

  // 팔로우 조회
  const { data: { follow: follows } = {} } = useQuery([FOLLOW.조회], () => follow(), {
    // enabled: '',
  })

  // 팔로우 취소
  const { mutate: mutateUnfollow } = useMutation(unFollow, {
    onSuccess: () => {
      query.invalidateQueries([FOLLOW.조회])
      toast.success('팔로우한 창고를 취소하였습니다.')
      // router.refresh()
      revalidatePath('/follow')
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  const onClickUnFollow = (storageId: number) => {
    if (!storageId) return
    mutateUnfollow(String(storageId))
  }

  const onClickReadMore = () => {
    openModal({
      modal: { id: 'itemsOfFollow', type: MODAL_TYPES.ALERT },
    })
  }

  return (
    <Layout canGoBack title='팔로우'>
      <div className={'mt-6'}>
        {follows && follows.length !== 0 ? (
          follows.map(follow => {
            return (
              <div key={follow.id} className='border-b py-6'>
                <div className='mb-3 flex cursor-pointer items-center space-x-3 px-2 pb-3'>
                  <div className={'flex w-full items-center justify-between'}>
                    <div className={'flex items-center justify-center gap-2'}>
                      <div className='h-10 w-10 rounded-full bg-slate-300' />
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
                  {follows.map(follow => {
                    return <div key={follow.imgUrl} className='h-24 w-24 rounded bg-slate-300' />
                  })}
                  <button className={'ml-1 whitespace-nowrap hover:underline'} onClick={onClickReadMore}>
                    &rarr;
                  </button>
                </div>
              </div>
            )
          })
        ) : (
          <div className={'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'}>
            <p className={'text-[15px]'}>팔로우 목록이 없습니다.</p>
          </div>
        )}
      </div>

      {_follow.modal.show ? (
        <CustomModal id={_follow.modal.id} type={MODAL_TYPES.ALERT}>
          <FollowUserItemPopup />
        </CustomModal>
      ) : null}
    </Layout>
  )
}

export default Follow
