'use client'

import React, { useEffect } from 'react'
import gsap from 'gsap'
import Link from 'next/link'
import { AxiosError } from 'axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import initialLogo from '@/app/assets/image/logo_n.png'

import Layout from '@/app/components/template/main/layout/Layout'
import { ALARM } from '@/app/libs/client/reactQuery/queryKey/common'
import { cls } from '@/app/libs/client/utils/util'
import { E_NOTIFICATION_TYPE } from '@/app/libs/client/constants/code'

import { notification, searchNotification } from '@/app/apis/domain/common/alarm'

const Alarms = () => {
  const query = useQueryClient()

  // 알림 조회
  const { data: { data: alarms } = {} } = useQuery([ALARM.조회], notification)

  const pageAnimation = () => {
    gsap.fromTo(
      '.alarm-wrapper',
      {
        x: '100%',
        duration: 0.5,
        opacity: 0,
      },
      {
        x: '0%',
        duration: 0.5,
        opacity: 1,
      }
    )
  }

  useEffect(() => {
    pageAnimation()
  }, [])

  // 알림 읽음 처리
  const onReadAlarm = async (alarmId: number) => {
    const isAlreadyRead = alarms?.result.find(v => v.id === alarmId)?.isRead
    if (isAlreadyRead) return

    try {
      await searchNotification(String(alarmId))
      await query.invalidateQueries([ALARM.조회])
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return Promise.reject(error)
      }
    }
  }

  // 수신 알림 타입
  const getAlarmStatus = (value: E_NOTIFICATION_TYPE) => {
    return {
      TRANSACTION: '거래',
      CHAT: '채팅',
    }[value]
  }

  return (
    <Layout canGoBack title='알림'>
      <div className='alarm-wrapper h-inherit mt-12'>
        <div className='space-y-3'>
          {alarms?.result?.length === 0 ? (
            <div className={'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'}>
              <p className={'text-[15px]'}>알림 목록이 없습니다.</p>
            </div>
          ) : (
            alarms?.result.map(alarm => (
              <Link
                href={'/alarms'}
                key={alarm.id}
                className={cls(
                  'relative flex items-center space-x-3 rounded-xl border border-transparent px-4 py-3 hover:bg-[#1abc9c]/10',
                  alarm.isRead ? '' : 'bg-[#1abc9c]/20'
                )}
                onClick={() => onReadAlarm(alarm.id)}>
                <div
                  className={cls(
                    'flex h-12 w-12 items-center justify-center rounded-xl border',
                    alarm.isRead ? 'border-[#ddd]' : 'border-transparent bg-white'
                  )}>
                  <Image src={initialLogo} width={'24'} height={'24'} alt={'이니셜 로고'} className={'object-cover'} />
                </div>
                <div className={'pb-1'}>
                  <span className={'text-[12px] text-[#777]'}>{getAlarmStatus(alarm.notificationType)}</span>
                  <p className='text-[13px]'>{alarm.content}</p>
                </div>
                <span className={'absolute right-4 text-xs'}>{alarm.isRead ? '읽음' : '안읽음'}</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Alarms
