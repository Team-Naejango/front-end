'use client'

import React, { useEffect, useState } from 'react'
import KakaoLogo from '@/app/assets/img/kakaoLogo.png'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import Image from 'next/image'
import { BiKey, BiUser } from 'react-icons/bi'
import { FcGoogle } from 'react-icons/fc'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'

import InputField from '@/app/components/atom/InputField'
import Button from '@/app/components/atom/Button'
import { login, LoginForm } from '@/app/apis/domain/auth/auth'

interface FormProps {
  email: string
  password: string
}

const Login = () => {
  const router = useRouter()
  // const [method, setMethod] = useState<'email' | 'password'>('email')

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormProps>()

  const { mutate: mutateLogin } = useMutation((params: LoginForm) => login(params), {
    onSuccess: () => {
      console.log('로그인 성공')
      toast.success('로그인 성공')
      router.replace('/')
    },
  })

  const onKaKaoLogin = () => {
    router.push('/kakaoLogin')
  }

  const onValid = () => {
    alert('개발중!!!!!!!!!!!!!!')
    reset()
  }

  // useEffect(() => {
  //   if (document.location.href.includes('login')) {
  //     router.replace('/')
  //   }
  // }, [router])

  return (
    <div className='mx-auto h-[770px] w-[375px] max-w-[375px] overflow-auto rounded-[30px] bg-[#fff] p-5'>
      <div className='mt-20 px-4'>
        <h3 className='text-center text-2xl font-semibold text-[#A3D139]'>로그인</h3>
        <div className='mt-20'>
          <form onSubmit={handleSubmit(onValid)} className='mt-8 flex flex-col space-y-2'>
            <InputField
              register={register('email', {
                required: '이메일을 입력해주세요.',
              })}
              type='email'
              placeholder='이메일'
              icon={<BiUser className='absolute ml-2.5 text-base text-[#A9A9A9]' />}
            />
            <p className='!mt-1.5 text-xs text-red-400'>{errors.email?.message}</p>
            <InputField
              register={register('password', {
                required: '비밀번호를 입력해주세요.',
              })}
              type='password'
              placeholder='비밀번호'
              autoComplete='new-password'
              icon={<BiKey className='absolute ml-2.5 text-base text-[#A9A9A9]' />}
            />
            <p className='!mt-1 text-xs text-red-400'>{errors.password?.message}</p>
            <p className='!my-4 flex justify-end text-xs text-[#A9A9A9] '>
              앗! 회원이 아니신가요?
              <Link
                href={'/sign'}
                onClick={event => event.stopPropagation()}
                className='px-1.5 text-[13px] text-[#A3D139] hover:underline'>
                회원가입
              </Link>
            </p>
            <div className={'!mb-3 flex justify-center gap-10 align-middle'}>
              <Link
                href={'/findEmail'}
                onClick={event => event.stopPropagation()}
                className={'text-[13px] text-[#222] hover:underline'}>
                아이디 찾기
              </Link>
              <Link
                href={'/findPassword'}
                onClick={event => event.stopPropagation()}
                className={'text-[13px] text-[#222] hover:underline'}>
                비밀번호 찾기
              </Link>
            </div>
            <Button text='로그인' />
          </form>

          <div className='mt-8'>
            <div className='relative -top-3 text-center'>
              <span
                className={`relative border-blue-100 px-2 text-xs text-gray-500 before:absolute before:bottom-1/2 before:right-8 before:mr-1.5 before:h-[1px] before:w-[130px] before:bg-gray-300 before:text-red-500 before:content-[''] 
                  after:absolute after:bottom-1/2 after:left-8 after:ml-1.5 after:mt-1 after:h-[1px] after:w-[130px] after:bg-gray-300 after:text-red-500 after:content-['']
                  `}>
                또는
              </span>
            </div>
            <div className='mt-2 grid grid-cols-1 gap-3'>
              <button
                onClick={onKaKaoLogin}
                className='flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-normal text-gray-500 shadow-sm hover:bg-gray-50'>
                <Image src={KakaoLogo} alt='카카오로고' width={24} height={24} className='mr-2.5' unoptimized />
                카카오 로그인
              </button>
              <button className='flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-normal text-gray-500 shadow-sm hover:bg-gray-50'>
                <FcGoogle className='mr-2.5 text-2xl' />
                구글 로그인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
