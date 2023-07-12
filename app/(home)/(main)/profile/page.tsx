'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useRecoilValue } from 'recoil'
import { GrFormNext } from 'react-icons/gr'

import Layout from '@/app/components/organism/layout/Layout'
import SwitchButton from '@/app/components/atom/SwitchButton'
import { MODAL_TYPES } from '@/app/libs/client/constants/code'
import CustomModal from '@/app/components/molecule/modal/CustomModal'
import { modalSelector } from '@/app/store/modal'
import { useModal } from '@/app/hooks/useModal'

const Profile = () => {
  const router = useRouter()
  const { openModal } = useModal()
  const [switchStatus, setSwitchStatus] = useState<boolean>(false)
  const modalState = useRecoilValue(modalSelector('Account'))

  const onClickShowModal = () => {
    openModal({
      modal: { id: 'Account', type: MODAL_TYPES.CONFIRM },
    })
  }

  const onClickSwitch = () => {
    setSwitchStatus(prevState => !prevState)
    // setSwitchStatus(event ? SWITCH_STATUS.온 : SWITCH_STATUS.오프)
    // setValue('notificationFlag', event.target.checked ? FLAG.TRUE : FLAG.FALSE)
  }

  const onLink = (value: string) => {
    router.push(value)
  }

  // useEffect(() => {
  //   release === SWITCH_STATUS.온 || release === 1
  //     ? setSwitchStatus(SWITCH_STATUS.온)
  //     : setSwitchStatus(SWITCH_STATUS.오프)
  // }, [])

  return (
    <Layout hasHeader setting seoTitle={'프로필'}>
      <div className='mt-12 px-4'>
        <ul className={'flex flex-col gap-3.5'}>
          <li
            role={'presentation'}
            onClick={() => onLink('/profile/edit')}
            className={'flex cursor-pointer items-center justify-between py-3 hover:text-gray-600'}>
            <span className={'text-sm'}>회원정보 수정</span>
            <GrFormNext />
          </li>
          <li className={'flex cursor-pointer items-center justify-between py-3 hover:text-gray-600'}>
            <span className={'text-sm'}>알림 설정</span>
            <SwitchButton value={switchStatus} changeHandler={onClickSwitch} />
          </li>
          <li
            role={'presentation'}
            onClick={() => onLink('/profile/sold')}
            className={'flex cursor-pointer items-center justify-between py-3 hover:text-gray-600'}>
            <span className={'text-sm'}>판매내역</span>
            <GrFormNext />
          </li>
          <li
            role={'presentation'}
            onClick={() => onLink('/profile/bought')}
            className={'flex cursor-pointer items-center justify-between py-3 hover:text-gray-600'}>
            <span className={'text-sm'}>구매내역</span>
            <GrFormNext />
          </li>
          <li
            role={'presentation'}
            onClick={() => onLink('/profile/loved')}
            className={'flex cursor-pointer items-center justify-between py-3 hover:text-gray-600'}>
            <span className={'text-sm'}>관심 목록</span>
            <GrFormNext />
          </li>
        </ul>
        <div className={'pb-2 pt-6'}>
          <span className={`block h-[1px] w-full bg-gray-300`} />
        </div>
        <ul className={'flex flex-col gap-3.5 hover:text-gray-600'}>
          <li
            role={'presentation'}
            className={'flex cursor-pointer items-center justify-between py-3'}
            onClick={onClickShowModal}>
            <span className={'text-sm'}>계정 설정</span>
          </li>
        </ul>
      </div>

      {modalState.modal.show ? (
        <CustomModal id={modalState.modal.id}>
          <ul className={'flex flex-col gap-3'}>
            <li className={'cursor-pointer py-2 text-sm hover:text-gray-600'}>로그아웃</li>
            <li className={'cursor-pointer py-2 text-sm hover:text-gray-600'}>탈퇴하기</li>
          </ul>
        </CustomModal>
      ) : null}
    </Layout>
  )
}

export default Profile
