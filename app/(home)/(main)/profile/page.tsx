'use client'

import React, { useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { useRecoilValue } from 'recoil'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { GrFormNext } from 'react-icons/gr'
import { ApiError } from 'next/dist/server/api-utils'

import Layout from '@/app/components/template/main/layout/Layout'
import SwitchButton from '@/app/components/atom/SwitchButton'
import { MODAL_TYPES } from '@/app/libs/client/constants/code'
import CustomModal from '@/app/components/molecule/modal/CustomModal'
import { modalSelector } from '@/app/store/modal'
import { useModal } from '@/app/hooks/useModal'
import { removeAuthToken } from '@/app/libs/client/utils/cookie'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store'
import Loading from '@/app/loading'

import { deleteUser } from '@/app/apis/domain/profile/profile'

const Profile = () => {
  const router = useRouter()
  const { openModal } = useModal()
  const [switchStatus, setSwitchStatus] = useState<boolean>(false)
  const _account = useRecoilValue(modalSelector('account'))
  const _logout = useRecoilValue(modalSelector('logout'))
  const _withdrawal = useRecoilValue(modalSelector('withdrawal'))

  const { mutate: mutateDeleteUser } = useMutation(deleteUser, {
    onSuccess: () => {
      console.log('유저탈퇴 성공')
      removeAuthToken(AUTH_TOKEN.접근, AUTH_TOKEN.갱신)
      router.push('/login')
    },
    onError: (error: ApiError) => {
      console.log('error:', error)
      toast.error(error.message)
    },
  })

  const onClickUserSetting = () => {
    openModal({
      modal: { id: 'account', type: MODAL_TYPES.CONFIRM },
    })
  }

  const logout = () => {
    openModal({
      modal: {
        id: 'logout',
        type: MODAL_TYPES.CONFIRM,
        title: '로그아웃',
        show: true,
        content: '로그아웃을 하시겠습니까?',
      },
      callback: () => {
        console.log('로그아웃 성공')
        removeAuthToken(AUTH_TOKEN.접근, AUTH_TOKEN.갱신)
        router.push('/login')
      },
    })
  }

  const withdrawal = () => {
    openModal({
      modal: {
        id: 'withdrawal',
        type: MODAL_TYPES.CONFIRM,
        title: '탈퇴',
        show: true,
        content: '회원을 탈퇴 하시겠습니까?',
      },
      callback: () => {
        console.log('회원탈퇴 성공')
        mutateDeleteUser()
      },
    })
  }

  const onClickSwitch = () => {
    setSwitchStatus(prevState => !prevState)
    // setValue('notificationFlag', event.target.checked ? FLAG.TRUE : FLAG.FALSE)
  }

  const onLink = (value: string) => {
    router.push(value)
  }

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
            onClick={onClickUserSetting}>
            <span className={'text-sm'}>계정 설정</span>
          </li>
        </ul>
      </div>

      {_account.modal.show ? (
        <CustomModal id={_account.modal.id}>
          <ul className={'flex flex-col gap-4'}>
            <li role={'presentation'} className={'cursor-pointer py-2 text-sm hover:text-gray-600'} onClick={logout}>
              로그아웃
            </li>
            <li
              role={'presentation'}
              className={'cursor-pointer py-2 text-sm hover:text-gray-600'}
              onClick={withdrawal}>
              탈퇴하기
            </li>
          </ul>
        </CustomModal>
      ) : null}

      {_logout.modal.show ? (
        <Suspense fallback={<Loading />}>
          <CustomModal id={_logout.modal.id} type={'dialog'} />
        </Suspense>
      ) : null}

      {_withdrawal.modal.show ? (
        <Suspense fallback={<Loading />}>
          <CustomModal id={_withdrawal.modal.id} type={'dialog'} />
        </Suspense>
      ) : null}
    </Layout>
  )
}

export default Profile
