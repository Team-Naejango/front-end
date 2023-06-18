'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { BiUserPin } from 'react-icons/bi'
import { FiActivity } from 'react-icons/fi'
import { useRecoilValue } from 'recoil'

import InputField from '@/app/components/atom/InputField'
import Button from '@/app/components/atom/Button'
import { nickNameValidity, sign } from '@/app/apis/domain/auth/auth'
import { kakaoAccessToken } from '@/app/store/atom'
import GenderButton from '@/app/components/atom/GenderButton'

interface FormProps {
  nickname: string
  birth: number
  gender: string
}

const Sign = () => {
  const router = useRouter()
  const accessToken = useRecoilValue(kakaoAccessToken)
  const [gender, setGender] = useState<string>('')
  const [isNicknameDisabled, setIsNicknameDisabled] = useState<boolean>(false)
  const [selectedNickname, setSelectedNickname] = useState<string>('')
  console.log('accessToken:', accessToken)
  console.log('gender:', gender)

  const {
    register,
    watch,
    handleSubmit,
    reset,
    getValues,
    setError,
    formState: { errors },
  } = useForm<FormProps>()

  const nickname = watch('nickname')

  const { mutate: mutateSign } = useMutation(sign, {
    onSuccess: () => {
      console.log('회원가입 성공')
      router.push('/home')
    },
    onError: (error: unknown) => {
      console.log('error:', error)
    },
  })

  const { mutate: mutateNickname } = useMutation(nickNameValidity, {
    onSuccess: () => {
      console.log('닉네임 사용 가능')
      setIsNicknameDisabled(true)
      setSelectedNickname(getValues('nickname'))
    },
  })

  const onClickSave = () => {
    if (!isNicknameDisabled) return alert('중복검사 해라')
    if (isNicknameDisabled && selectedNickname !== nickname) return alert('다시 중복검사 해라')

    mutateSign({
      birth: watch('birth'),
      nickname,
      gender,
    })

    reset()
  }

  console.log('watch', watch('nickname'))
  console.log('typeof', typeof watch('nickname'))

  const onUserNameValidation = (event: React.MouseEvent) => {
    // event.preventDefault()
    if (nickname === '') return false
    // query mutation api call
    // mutateNickname(watch('nickname'))
  }

  const onSelectedGender = (gender: '남' | '여') => {
    setGender(gender)
  }

  useEffect(() => {
    // if (selectedNickname !== nickname) {
    //   setIsNicknameDisabled(true)
    // }
  }, [nickname, selectedNickname])

  return (
    <div className='mt-20 px-4'>
      <h3 className='text-center text-2xl font-semibold text-[#A3D139]'>회원가입</h3>
      <div className='mt-[4.75rem]'>
        <form onSubmit={handleSubmit(onClickSave)} className='mt-8 flex flex-col space-y-2'>
          <div className={'flex flex-row items-center'}>
            <InputField
              register={register('nickname', {
                required: '닉네임을 입력해주세요.',
                value: undefined,
                onChange: event => {
                  if (event.target.value.match(/^\s/g)) {
                    setError('nickname', {
                      message: '첫 글자에 공백을 입력할 수 없습니다.',
                    })
                  }
                },
              })}
              id='nickname'
              type='text'
              maxLength={12}
              placeholder='닉네임'
              icon={<BiUserPin className='absolute ml-2.5 text-base text-[#A9A9A9]' />}
            />
            <Button
              type={'button'}
              smail
              text='중복검사'
              onClick={onUserNameValidation}
              disabled={nickname === undefined || nickname === ''}
            />
          </div>
          <p className='!mt-1.5 text-xs text-red-400'>{errors.nickname?.message}</p>
          <div className='!mt-1 flex flex-row items-center space-y-3'>
            <InputField
              register={register('birth', {
                required: '생년월일을 입력해주세요.',
                pattern: {
                  value: /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/,
                  message: '유효한 생년월일을 입력해주세요. (YYYYMMDD)',
                },
              })}
              id='birth'
              type='text'
              maxLength={8}
              placeholder='생년월일(YYYYMMDD)'
              icon={<FiActivity className='absolute ml-2.5 text-sm text-[#A9A9A9]' />}
            />
            <GenderButton gender='남' selected={gender === '남'} onClick={() => onSelectedGender('남')} />
            <GenderButton gender='여' selected={gender === '여'} onClick={() => onSelectedGender('여')} />
          </div>
          <p className='!mt-1.5 text-xs text-red-400'>{errors.birth?.message}</p>
          <p className='!my-4 flex justify-end text-xs text-[#A9A9A9]'>
            앗! 계정이 있으신가요?
            <Link
              href={'/login'}
              onClick={event => event.stopPropagation()}
              className='px-1.5 text-[#A3D139] underline'>
              로그인
            </Link>
          </p>
          <Button text='회원가입' />
        </form>
      </div>
    </div>
  )
}

export default Sign
