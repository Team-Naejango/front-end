'use client'

import React from 'react'
import { toast } from 'react-hot-toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ApiError } from 'next/dist/server/api-utils'

import Layout from '@/app/components/template/main/layout/Layout'
import WishItemCard from '@/app/components/organism/profile/WishItemCard'
import { WISH } from '@/app/libs/client/reactQuery/queryKey/profile/wish'

import { unWish, wish } from '@/app/apis/domain/profile/wish'

const Wish = () => {
  const query = useQueryClient()

  // 관심 조회
  const { data: { data: wishs } = {} } = useQuery([WISH.조회], () => wish())

  // 관심 취소
  const { mutate: mutateUnWish } = useMutation(unWish, {
    onSuccess: () => {
      query.invalidateQueries([WISH.조회])
      toast.success('관심 상품이 취소되었습니다.')
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
    <Layout canGoBack title='관심상품'>
      <div className={'py-8'}>
        <div className='grid grid-cols-2 grid-rows-[minmax(0,1fr)] items-center justify-center'>
          {wishs?.length === 0 ? (
            <div className={'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'}>
              <p className={'text-[15px]'}>관심상품 목록이 없습니다.</p>
            </div>
          ) : (
            wishs?.map(wish => (
              <WishItemCard
                key={wish.id}
                img={wish.imgUrl}
                hearts
                title={wish.name}
                onClick={() => onClickUnWish(wish.id)}
              />
            ))
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Wish
