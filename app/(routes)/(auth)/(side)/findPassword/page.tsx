'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import InputField from '@/app/components/atom/InputField'
import Button from '@/app/components/atom/Button'
import BackHeader from '@/app/components/template/main/header/BackHeader'

interface FormProps {
  email: string
  verify: number
}

const FindPassword = () => {
  const searchParams = useSearchParams()
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>()

  const onValidEmail = () => {
    setIsEmailValid(true)
  }

  const onValidVerify = () => {
    toast.error('현재 카카오 로그인만 허용했습니다.')
  }

  return (
    <>
      <BackHeader canGoBack title={'비밀번호 찾기'} seoTitle={'비밀번호 찾기'} />
      <div className='mt-20'>
        <form onSubmit={handleSubmit(onValidEmail)} className='mt-8 flex flex-row items-center'>
          <InputField
            register={register('email', {
              required: '이메일을 입력해주세요.',
            })}
            type='email'
            placeholder='이메일'
          />
          <Button small text='인증번호 받기' className={'ml-2'} />
        </form>
        {isEmailValid && (
          <form onSubmit={handleSubmit(onValidVerify)} className='mt-2 flex flex-row items-center space-y-3'>
            <InputField
              register={register('verify', {
                required: '인증번호를 입력해주세요.',
              })}
              type='number'
              placeholder='인증번호'
            />
            <Button text='인증하기' small />
          </form>
        )}
        <p className='!mt-1.5 text-xs text-red-400'>{errors.email?.message || errors.verify?.message}</p>
      </div>
    </>
  )
}

export default FindPassword
