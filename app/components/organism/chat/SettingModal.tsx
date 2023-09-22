import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { ApiError } from 'next/dist/server/api-utils'
import { toast } from 'react-hot-toast'
import face from '@/app/assets/image/face.png'

import InputField from '@/app/components/atom/InputField'
import { cls } from '@/app/libs/client/utils/util'
import { CHAT } from '@/app/libs/client/reactQuery/queryKey/chat'
import getQueryClient from '@/app/libs/client/reactQuery/getQueryClient'
import { useModal } from '@/app/hooks/useModal'
import Button from '@/app/components/atom/Button'

import { convertedName } from '@/app/apis/domain/chat/chat'
import { groupChatUserInfo } from '@/app/apis/domain/chat/channel'

interface SettingProps {
  title: string
}

const SettingModal = ({ channelId, chatId, title }: { channelId: string; chatId: number | null; title: string }) => {
  const query = getQueryClient()
  const { closeModal } = useModal()

  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<SettingProps>({ mode: 'onSubmit', reValidateMode: 'onChange' })

  // 채팅 참여자 조회
  const { data: { data: membersInfo } = {} } = useQuery([CHAT.참여자조회], () => groupChatUserInfo(channelId), {
    enabled: !!channelId,
  })

  // 채팅방 제목 변경
  const { mutate: mutateName } = useMutation(convertedName, {
    onSuccess: () => {
      query.invalidateQueries([CHAT.조회])
      closeModal('setting')
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })

  useEffect(() => {
    setValue('title', title)
  }, [])

  return (
    <div>
      <h2 className={'text-center text-lg'}>설정</h2>
      <button
        type='button'
        onClick={() => closeModal('setting')}
        className='absolute right-3 top-3 hover:text-[#666] focus-visible:outline-offset-[-4px]'>
        <span className='sr-only'>Dismiss</span>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-5 w-5'>
          <path d='M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z' />
        </svg>
      </button>

      <div className={'mt-6'}>
        <h3 className={'mb-2 text-left text-xs font-medium leading-none text-gray-700'}>채팅방 제목</h3>
        <div className={'flex items-center'}>
          <InputField
            type='text'
            register={register('title', { required: '채팅방 제목을 입력해주세요.', value: title })}
            placeholder='채팅방 제목'
          />
          <Button
            small
            text='변경'
            className={'ml-2 !px-0 !text-[13px]'}
            onClick={async () => mutateName({ chatId: String(chatId), title: getValues('title') })}
          />
        </div>
        <p className='!mt-1.5 text-xs text-red-400'>{errors.title?.message}</p>
      </div>

      <div className={'mt-6'}>
        <h3 className={'mb-2 text-left text-xs font-medium leading-none text-gray-700'}>
          참가자 {membersInfo?.result.length}명
        </h3>
        <div className={'flex flex-col gap-2'}>
          {membersInfo?.result.map(info => {
            return (
              <div key={info.participantId} className={'flex items-center gap-2'}>
                {info.imgUrl === '' ? (
                  <Image
                    src={face}
                    priority
                    width={'30'}
                    height={'30'}
                    quality={100}
                    alt='프로필 이미지'
                    className={cls('rounded-full border bg-gray-300 object-cover')}
                  />
                ) : (
                  <Image
                    src={`https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/upload/profile/${encodeURIComponent(
                      info.imgUrl as string
                    )}`}
                    priority
                    width={'30'}
                    height={'30'}
                    quality={100}
                    alt='프로필 이미지'
                    className={cls('rounded-full border bg-gray-300 object-cover')}
                  />
                )}
                <span className={'text-xs'}>{info.nickname}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SettingModal
