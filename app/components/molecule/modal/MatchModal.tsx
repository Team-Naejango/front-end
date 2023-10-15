'use client'

import React from 'react'
import Image from 'next/image'
import { useRecoilValue } from 'recoil'
import match from '@/app/assets/image/match.svg'

import Button from '@/app/components/atom/Button'
import { useModal } from '@/app/hooks/useModal'
import { modalSelector } from '@/app/store/modal'

const MatchModal = ({ id, onMatch }: { id: string; onMatch: () => void }) => {
  const { closeModal } = useModal()
  const modalState = useRecoilValue(modalSelector(id))

  // 모달 취소
  const onCloseModal = (id: string) => {
    const hasModalId = modalState.modal.id === id
    if (hasModalId) return closeModal(id)
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='w-[330px] rounded-lg bg-white p-8 shadow-lg'>
        <div className='text-center'>
          <p className='mb-6 text-lg font-semibold'>
            근처에 있는
            <br />
            <span className='text-[#32D7A0]'>아이템</span>을 매칭해 드려요!
          </p>
          <Image priority src={match} quality={100} alt={'매칭 이미지'} className={'mx-auto h-48 w-48'} />
        </div>
        <div className='mt-7 flex justify-center gap-4 text-center'>
          <Button text={'매칭'} onClick={onMatch} />
          <Button cancel text={'닫기'} onClick={() => onCloseModal(id)} />
        </div>
      </div>
    </div>
  )
}

export default MatchModal
