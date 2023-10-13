'use client'

import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { ApiError } from 'next/dist/server/api-utils'

import Layout from '@/app/components/template/main/layout/Layout'
import Button from '@/app/components/atom/Button'
import RadioPicker, { DataTypes } from '@/app/components/molecule/tab/RadioPicker'
import { POINTS } from '@/app/libs/client/constants/static'
import { OAUTH } from '@/app/libs/client/reactQuery/queryKey/auth'

import { account } from '@/app/apis/domain/warehouse/account'

const PointCharge = () => {
  const query = useQueryClient()
  const router = useRouter()
  const [selectedPoint, setSelectedPoint] = useState<DataTypes>(POINTS[0])

  // 잔고 충전
  const { mutate: mutateAccount } = useMutation(account, {
    onSuccess: () => {
      query.invalidateQueries([OAUTH.유저정보])
      toast.success('잔고 충전이 완료되었습니다.')
      router.push('/warehouse')
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  // 전송
  const onSubmit = async () => {
    if (!selectedPoint.value) return

    mutateAccount(selectedPoint.value)
  }

  return (
    <Layout canGoBack title={'잔고 충전'} seoTitle={'잔고 충전'}>
      <div className='mt-10 px-2'>
        <RadioPicker data={POINTS} selectedRadio={selectedPoint} setSelectedRadio={setSelectedPoint} />
        <div className={'fixed bottom-[95px] left-1/2 w-[90%] -translate-x-1/2 transform'}>
          <Button type={'submit'} text={'충전하기'} onClick={onSubmit} />
        </div>
      </div>
    </Layout>
  )
}

export default PointCharge
