'use client'

import React, { useState, Suspense, useEffect } from 'react'
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
import { AUTH_TOKEN } from '@/app/libs/client/constants/store/common'
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
      removeAuthToken(AUTH_TOKEN.접근, AUTH_TOKEN.갱신)
      toast.success('회원 탈퇴 되었습니다.')
    },
    onError: (error: ApiError) => {
      console.log('error:', error)
      toast.error(error.message)
    },
    onSettled: () => {
      router.push('/login')
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
        content: '로그아웃 하시겠습니까?',
      },
      callback: () => {
        removeAuthToken(AUTH_TOKEN.접근, AUTH_TOKEN.갱신)
        toast.success('로그아웃 되었습니다.')
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
        content: '회원 탈퇴 하시겠습니까?',
      },
      callback: () => {
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
            onClick={() => onLink('/profile/follow')}
            className={'flex cursor-pointer items-center justify-between py-3 hover:text-gray-600'}>
            <span className={'text-sm'}>팔로우</span>
            <GrFormNext />
          </li>
          <li
            role={'presentation'}
            onClick={() => onLink('/profile/loved')}
            className={'flex cursor-pointer items-center justify-between py-3 hover:text-gray-600'}>
            <span className={'text-sm'}>관심 상품</span>
            <GrFormNext />
          </li>
          <li
            role={'presentation'}
            onClick={() => onLink('/profile/review')}
            className={'flex cursor-pointer items-center justify-between py-3 hover:text-gray-600'}>
            <span className={'text-sm'}>리뷰 내역</span>
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
        <Suspense fallback={<Loading />}>
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
        </Suspense>
      ) : null}

      {_logout.modal.show ? (
        <Suspense fallback={<Loading />}>
          <CustomModal id={_logout.modal.id} type={MODAL_TYPES.DIALOG} />
        </Suspense>
      ) : null}

      {_withdrawal.modal.show ? (
        <Suspense fallback={<Loading />}>
          <CustomModal id={_withdrawal.modal.id} type={MODAL_TYPES.DIALOG} />
        </Suspense>
      ) : null}
    </Layout>
  )
}

export default Profile
