'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import InputField from '@/app/components/atom/InputField'
import Button from '@/app/components/atom/Button'
import BackHeader from '@/app/components/template/main/header/BackHeader'

interface FormProps {
  email: string
}

const FindEmail = () => {
  const router = useRouter()
  const [isFindEmail, setIsFindEmail] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormProps>({ mode: 'onSubmit', reValidateMode: 'onChange' })

  // 전송
  const onSubmit = () => {
    toast.error('현재 카카오 로그인만 허용했습니다.')
    reset()
  }

  // 로그인/비밀번호 찾기 리다이렉트
  const onClickRedirect = (event: React.MouseEvent, url: string) => {
    event.stopPropagation()
    event.preventDefault()

    if (url === 'login') {
      router.push(`/${url}`)
    } else if (url === 'findPassword') {
      router.push(`/${url}`)
    }
  }

  return (
    <>
      <BackHeader canGoBack title={'아이디 찾기'} seoTitle={'아이디 찾기'} />
      <div className='mt-20 px-4'>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-8 flex flex-col space-y-3'>
          <InputField
            register={register('email', {
              required: '휴대폰 번호를 입력해주세요.',
            })}
            type='tel'
            placeholder='휴대폰 번호'
          />
          <p className='!mt-1.5 text-xs text-red-400'>{errors.email?.message}</p>
          {isFindEmail && (
            <div className={'!my-6 flex flex-col items-center justify-center gap-1'}>
              <p className={'text-sm font-normal'}>회원 이메일을 찾았습니다.</p>
              <p className={'text-sm font-semibold'}>{`asd****@naver.com`}</p>
            </div>
          )}
          {isFindEmail ? (
            <>
              <Button onClick={(e: React.MouseEvent) => onClickRedirect(e, 'login')} text='로그인' />
              <Button onClick={(e: React.MouseEvent) => onClickRedirect(e, 'findPassword')} text='비밀번호 찾기' />
            </>
          ) : (
            <Button text='이메일 찾기' />
          )}
        </form>
      </div>
    </>
  )
}

export default FindEmail
