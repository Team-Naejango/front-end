'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import InputField from '@/app/components/atom/InputField'
import Button from '@/app/components/atom/Button'
import Header from '@/app/components/template/main/header'
import { verify } from '@/app/apis/domain/auth/auth'

interface FormProps {
  email: string
  verify: number
}

const FindPassword = () => {
  const router = useRouter()
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false)

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<FormProps>()

  const onValidEmail = () => {
    setIsEmailValid(true)
  }

  const onValidVerify = () => {
    alert('개발중!!!!!!!!!!!!!!')
    // reset()
  }

  return (
    <div className=' bor-al relative mx-auto h-[770px] w-[375px] max-w-xl overflow-auto rounded-[30px] bg-[#fff] p-5'>
      <Header canGoBack title={'비밀번호 찾기'} seoTitle={'비밀번호 찾기'} />
      <div className='mt-20'>
        <form onSubmit={handleSubmit(onValidEmail)} className='mt-8 flex flex-row items-center space-y-3'>
          <InputField
            register={register('email', {
              required: '이메일을 입력해주세요.',
            })}
            type='email'
            placeholder='이메일'
          />
          <Button text='인증번호 받기' smail />
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
            <Button text='인증하기' smail />
          </form>
        )}
        <p className='!mt-1.5 text-xs text-red-400'>{errors.email?.message || errors.verify?.message}</p>
      </div>
    </div>
  )
}

export default FindPassword
