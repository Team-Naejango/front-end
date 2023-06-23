'use client'

import React from 'react'

import Carousel from '@/app/components/molecule/slide/Carousel'
import Button from '@/app/components/atom/Button'
import { useModal } from '@/app/hooks/useModal'
import { useRecoilState } from 'recoil'
import { useModalStore } from '@/app/store/atom'

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
    <div className='flex h-auto items-center justify-center'>
      <Carousel />
      <div className={'mt-80'}>
        <Button onClick={() => onClickModal()} text={'다이얼로그 테스트 버튼'} />
      </div>
    </div>
  )
}

export default Home
