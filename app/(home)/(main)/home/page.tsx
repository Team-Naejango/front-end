'use client'

import React from 'react'

import { useModal } from '@/app/hooks/useModal'
import Layout from '@/app/components/organism/layout/Layout'
import Carousel from '@/app/components/molecule/slide/Carousel'
import Button from '@/app/components/atom/Button'
import { MODAL_TYPES } from '@/app/libs/client/constants/code'

const Home = () => {
  const { openModal } = useModal()

  const onClickShowTrueAlert = () => {
    openModal({ modal: { id: 'testTrueAlert', type: MODAL_TYPES.ALERT }, callback: () => {} })
  }
  const onClickShowFalseAlert = () => {
    openModal({ modal: { id: 'testFalseAlert', type: MODAL_TYPES.ALERT }, callback: () => {} })
  }

  return (
    <Layout hasHeader seoTitle={'홈'}>
      <div className='flex items-center justify-center'>
        <div className={'mt-8 w-full'}>
          <Carousel />
          <div className={'mx-auto mt-80 flex w-[80%] gap-4'}>
            <Button smail onClick={() => onClickShowTrueAlert()} text={'성공 버튼'} />
            <Button
              smail
              className={'!bg-red-500 hover:!bg-[#F05454] focus:!ring-red-500'}
              onClick={() => onClickShowFalseAlert()}
              text={'실패 버튼'}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
