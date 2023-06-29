'use client'

import React from 'react'
import { useRecoilState } from 'recoil'

import { useModal } from '@/app/hooks/useModal'
import { useModalStore } from '@/app/store/atom'
import Layout from '@/app/components/organism/layout/Layout'
import Carousel from '@/app/components/molecule/slide/Carousel'
import Button from '@/app/components/atom/Button'

const Home = () => {
  const { openModal, closeModal } = useModal()
  const [modalState, setModalState] = useRecoilState(useModalStore)

  const onClickModal = () => {
    setModalState({
      isOpen: true,
      title: '',
      content: '',
      callback: () => {
        closeModal()
      },
    })
  }

  return (
    <Layout hasHeader seoTitle={'홈'}>
      <div className='flex items-center justify-center'>
        <div className={'mt-8'}>
          <Carousel />
          <div className={'mt-80'}>
            <Button onClick={() => onClickModal()} text={'다이얼로그 테스트 버튼'} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
