'use client'

import React from 'react'
import { BiKey, BiUser } from 'react-icons/bi'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'

import InputField from '@/app/components/atom/InputField'
import { sign } from '@/app/apis/domain/auth/auth'
import Button from '@/app/components/atom/Button'

interface FormProps {
  email: string
  password: string
  rePassword: string
}

const Sign = () => {
  const router = useRouter()

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<FormProps>()

  const { mutate: mutateSign } = useMutation(sign, {
    onSuccess: () => {
      console.log('회원가입 성공')
      toast.success('회원가입이 성공했습니다.')
      router.push('/login')
    },
  })

  const onValid = () => {
    if (watch('password') !== watch('rePassword')) {
      setError('rePassword', { message: '비밀번호가 일치하지 않습니다.' })
      return
    }
    alert('개발중!!!!!!!!!!!!!!')
    reset()
  }

  return (
    <div className='bor-al mx-auto h-[770px] w-[375px] max-w-xl rounded-[30px] bg-[#fff] p-5'>
      <div className='mt-20 px-4'>
        <h3 className='text-center text-2xl font-semibold text-[#A3D139]'>회원가입</h3>
        <div className='mt-20'>
          <form onSubmit={handleSubmit(onValid)} className='mt-8 flex flex-col space-y-3'>
            <InputField
              register={register('email', {
                required: '이메일을 입력해주세요.',
              })}
              id='email'
              type='email'
              placeholder='이메일'
              icon={<BiUser className='absolute ml-2.5 text-base text-[#A9A9A9]' />}
            />
            <p className='!mt-1.5 text-xs text-red-400'>{errors.email?.message}</p>
            <InputField
              register={register('password', {
                required: '비밀번호를 입력해주세요.',
              })}
              id='password'
              type='password'
              placeholder='비밀번호'
              autoComplete='new-password'
              icon={<BiKey className='absolute ml-2.5 text-base text-[#A9A9A9]' />}
            />
            <p className='!mt-1 text-xs text-red-400'>{errors.password?.message}</p>
            <InputField
              register={register('rePassword', {
                required: '비밀번호를 재입력해주세요.',
              })}
              id='rePassword'
              type='password'
              placeholder='비밀번호 재입력'
              autoComplete='new-password'
              icon={<BiKey className='absolute ml-2.5 text-base text-[#A9A9A9]' />}
            />
            <p className='!mt-1 text-xs text-red-400'>{errors.rePassword?.message}</p>
            <Button text='회원가입' />
          </form>

          <p className='mb-9 mt-4 flex justify-end text-xs text-[#A9A9A9]'>
            앗! 계정이 있으신가요?
            <Link href={'/login'} className='px-1.5 text-[#A3D139] underline'>
              로그인
            </Link>
          </p>

          <Toaster />
        </div>
      </div>
    </div>
  )
}

export default Sign
