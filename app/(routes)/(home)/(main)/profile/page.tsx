'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useRecoilValue } from 'recoil'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { GrFormNext } from 'react-icons/gr'
import { ApiError } from 'next/dist/server/api-utils'
import dynamic from 'next/dynamic'
import face from '@/app/assets/image/face.png'

import Layout from '@/app/components/template/main/layout/Layout'
import SwitchButton from '@/app/components/atom/SwitchButton'
import { E_SWITCH_STATUS, MODAL_TYPES, NOTIFICATION_PERMISSION, SWITCH_STATUS } from '@/app/libs/client/constants/code'
import { modalSelector } from '@/app/store/modal'
import { useModal } from '@/app/hooks/useModal'
import { removeAuthToken } from '@/app/libs/client/utils/cookie'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store/common'
import Loading from '@/app/loading'
import { OAUTH } from '@/app/libs/client/reactQuery/queryKey/auth'

import { deleteUser, userInfo } from '@/app/apis/domain/profile/profile'
import { logout as _kill } from '@/app/apis/domain/auth/auth'

const CustomModal = dynamic(() => import('@/app/components/molecule/modal/CustomModal'), {
  ssr: false,
  loading: () => <Loading />,
})

const Profile = () => {
  const router = useRouter()
  const { openModal } = useModal()
  const [switchStatus, setSwitchStatus] = useState<E_SWITCH_STATUS>(SWITCH_STATUS.오프)
  const [isNotificationSupported, setIsNotificationSupported] = useState<boolean>(false)
  const _account = useRecoilValue(modalSelector('account'))
  const _logout = useRecoilValue(modalSelector('logout'))
  const _withdrawal = useRecoilValue(modalSelector('withdrawal'))

  const notificationPermission = typeof Notification === 'undefined' ? undefined : Notification.permission

  // 프로필 조회
  const { data: { data: mineInfo } = {} } = useQuery([OAUTH.유저정보], () => userInfo())

  // 회원 탈퇴
  const { mutate: mutateDeleteUser } = useMutation(deleteUser, {
    onSuccess: () => {
      removeAuthToken(AUTH_TOKEN.접근, AUTH_TOKEN.갱신)
      toast.success('회원이 탈퇴 되었습니다.')
    },
    onError: (error: ApiError) => {
      console.log('error:', error)
      toast.error(error.message)
    },
    onSettled: () => {
      router.push('/login')
    },
  })

  // 알림 구독 탐지
  const subscribeToNotifications = async () => {
    if (notificationPermission === NOTIFICATION_PERMISSION.허용 || NOTIFICATION_PERMISSION.차단) return

    await Notification.requestPermission(permission => {
      console.log('permission:', permission)
      if (permission === NOTIFICATION_PERMISSION.허용) {
        setSwitchStatus(true)
        toast.success('알림이 구독되었습니다.')
      }
      if (permission === NOTIFICATION_PERMISSION.차단) {
        setSwitchStatus(false)
        toast.success('알림이 차단되었습니다.')
      }
    }).catch(error => {
      toast.error(error)
    })
  }

  useEffect(() => {
    if ('Notification' in window) setIsNotificationSupported(true)
    if ('permissions' in navigator) navigator.permissions.query({ name: 'notifications' })
    notificationPermission === 'granted' ? setSwitchStatus(SWITCH_STATUS.온) : setSwitchStatus(SWITCH_STATUS.오프)
  }, [])

  useEffect(() => {
    if (switchStatus && isNotificationSupported) subscribeToNotifications()
  }, [switchStatus])

  // 토글 변환기
  const onSwitchConverter = () => {
    if (notificationPermission === NOTIFICATION_PERMISSION.허용 || NOTIFICATION_PERMISSION.차단)
      return toast.error('알림 권한을 변경하려면 브라우저 설정에서 변경해주세요.')
    setSwitchStatus(convert => !convert)
  }

  const onLink = (value: string) => {
    router.push(value)
  }

  // 설정 모달
  const onClickUserSetting = () => {
    openModal({
      modal: { id: 'account', type: MODAL_TYPES.CONFIRM },
    })
  }

  // 로그아웃 모달
  const logout = () => {
    openModal({
      modal: {
        id: 'logout',
        type: MODAL_TYPES.CONFIRM,
        title: '로그아웃',
        content: '로그아웃을 하시겠습니까?',
      },
      callback: async () => {
        await _kill()
        removeAuthToken(AUTH_TOKEN.접근, AUTH_TOKEN.갱신)
        toast.success('로그아웃이 되었습니다.')
        router.replace('/login')
      },
    })
  }

  // 탈퇴 모달
  const withdrawal = () => {
    openModal({
      modal: {
        id: 'withdrawal',
        type: MODAL_TYPES.CONFIRM,
        title: '탈퇴',
        content: '회원을 탈퇴 하시겠습니까?',
      },
      callback: () => {
        mutateDeleteUser()
      },
    })
  }

  return (
    <Layout
      hasHeader
      setting
      seoTitle={'프로필'}
      src={
        mineInfo?.result.imgUrl === (undefined || '')
          ? (face as any)
          : `https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/upload/profile/${encodeURIComponent(
              mineInfo?.result.imgUrl as string
            )}
            `
      }>
      <div className='mt-4 px-4'>
        <ul className={'flex flex-col gap-3.5'}>
          <li
            role={'presentation'}
            onClick={() => onLink('/profile/edit?auth=3')}
            className={'flex cursor-pointer items-center justify-between py-3 hover:text-gray-600'}>
            <span className={'text-sm'}>회원정보 수정</span>
            <GrFormNext />
          </li>
          <li className={'flex cursor-pointer items-center justify-between py-3 hover:text-gray-600'}>
            <span className={'text-sm'}>알림 설정</span>
            <SwitchButton value={switchStatus} changeHandler={onSwitchConverter} />
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
            onClick={() => onLink('/profile/wish')}
            className={'flex cursor-pointer items-center justify-between py-3 hover:text-gray-600'}>
            <span className={'text-sm'}>관심 상품</span>
            <GrFormNext />
          </li>
          <li
            role={'presentation'}
            onClick={() => onLink('/profile/deal')}
            className={'flex cursor-pointer items-center justify-between py-3 hover:text-gray-600'}>
            <span className={'text-sm'}>거래 내역</span>
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

      {/* 모달 영역 */}
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

      {_logout.modal.show ? <CustomModal id={_logout.modal.id} type={MODAL_TYPES.DIALOG} /> : null}

      {_withdrawal.modal.show ? <CustomModal id={_withdrawal.modal.id} type={MODAL_TYPES.DIALOG} /> : null}
    </Layout>
  )
}

export default Profile
