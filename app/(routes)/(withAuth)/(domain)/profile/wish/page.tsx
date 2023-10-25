'use client'

import React from 'react'
import { toast } from 'react-hot-toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ApiError } from 'next/dist/server/api-utils'

import Layout from '@/app/components/template/main/layout/Layout'
import WishItemCard from '@/app/components/organism/profile/wish/WishItemCard'
import { WISH } from '@/app/libs/client/reactQuery/queryKey/profile/wish'

import { unWish, wish } from '@/app/apis/domain/profile/wish'

const Wish = () => {
  const query = useQueryClient()

  // 관심 조회
  const { data: { data: wishs } = {} } = useQuery([WISH.조회], () => wish())

  // 관심 삭제
  const { mutate: mutateUnWish } = useMutation(unWish, {
    onSuccess: () => {
      toast.success('관심 아이템에서 삭제되었습니다.')
      query.invalidateQueries([WISH.조회])
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  const onClickUnWish = (itemId: number) => {
    if (!itemId) return

    mutateUnWish(String(itemId))
  }

  return (
    <Layout canGoBack title='관심 아이템'>
      <div className={'py-8'}>
        <div className='grid grid-cols-2 grid-rows-[minmax(0,1fr)] items-center justify-center'>
          {wishs?.result?.length === 0 ? (
            <div className={'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'}>
              <p className={'text-[15px]'}>관심 아이템 목록이 없습니다.</p>
            </div>
          ) : (
            wishs?.result.map(wish => (
              <WishItemCard key={wish.id} hearts wish={wish} onClick={() => onClickUnWish(wish.id)} />
            ))
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Wish
