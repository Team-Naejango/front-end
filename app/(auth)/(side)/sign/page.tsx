'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'
import { BiUserPin } from 'react-icons/bi'
import { FiActivity } from 'react-icons/fi'
import { BsPhone } from 'react-icons/bs'

import InputField from '@/app/components/atom/InputField'
import Button from '@/app/components/atom/Button'
import { nickNameValidity, sign } from '@/app/apis/domain/auth/auth'
import { kakaoAccessToken } from '@/app/store/atom'
import GenderButton from '@/app/components/atom/GenderButton'
import { SignParams } from '@/app/apis/domain/profile/profile'

interface FormProps {
  age: number
  gender: string
  nickname: string
  intro: string
  phoneNumber: string
  imgUrl: string
}

const Sign = () => {
  const router = useRouter()
  const accessToken = useRecoilValue(kakaoAccessToken)
  const [isNicknameDisabled, setIsNicknameDisabled] = useState<boolean>(false)
  const [selectedNickname, setSelectedNickname] = useState<string>('')
  console.log('accessToken:', accessToken)

  const {
    register,
    watch,
    handleSubmit,
    reset,
    getValues,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormProps>()

  const nickname = watch('nickname')

  const { mutate: mutateSign } = useMutation((params: SignParams) => sign(accessToken, params), {
    onSuccess: ({ data }) => {
      console.log('data:', data)
      console.log('회원가입 성공')
      router.push('/home')
    },
    onError: (error: unknown) => {
      console.log('error:', error)
    },
  })

  // const x = async ({ age, nickname, gender, phoneNumber, intro, imgUrl }: FormProps) => {
  //   return fetch('http://43.202.25.203:8080/api/user/profile', {
  //     method: 'POST',
  //     headers: {
  //       Authorization: accessToken!,
  //     },
  //     body: JSON.stringify({
  //       age,
  //       nickname,
  //       gender,
  //       phoneNumber,
  //       intro,
  //       imgUrl,
  //     }),
  //   })
  //     .then(response => {
  //       console.log('response:', response)
  //       return response
  //     })
  //     .then(response => {
  //       console.log('response.data:', response.json())
  //     })
  //     .catch(error => {
  //       // 에러 처리 코드를 작성합니다.
  //       console.error(error)
  //     })
  // }

  const { mutate: mutateNickname } = useMutation(nickNameValidity, {
    onSuccess: () => {
      console.log('닉네임 사용 가능')
      setIsNicknameDisabled(true)
      setSelectedNickname(getValues('nickname'))
    },
  })

  const onClickSave = () => {
    // if (!isNicknameDisabled) return alert('중복검사 해라')
    // if (isNicknameDisabled && selectedNickname !== nickname) return alert('다시 중복검사 해라')

    mutateSign({
      age: Number(watch('age')),
      nickname,
      gender: watch('gender'),
      phoneNumber: watch('phoneNumber'),
      intro: '',
      imgUrl: '',
    })

    reset()
  }

  const onValidUserName = (event: React.MouseEvent) => {
    event.preventDefault()
    if (nickname === '') return false

    // query mutation api call
    // mutateNickname(watch('nickname'))
  }

  const onSelectedGender = (gender: '남' | '여') => {
    setValue('gender', gender)
  }

  useEffect(() => {
    // if (selectedNickname !== nickname) {
    //   setIsNicknameDisabled(true)
    // }
  }, [nickname, selectedNickname])

  return (
    <div className='mt-20 px-4'>
      <h3 className='text-center text-2xl font-semibold text-[#33CC99]'>회원가입</h3>
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
              onClick={onValidUserName}
              disabled={nickname === undefined || nickname === ''}
              className={'!text-[13px]'}
            />
          </div>
          <p className='!mt-1.5 text-xs text-red-400'>{errors.nickname?.message}</p>
          <div className='!mt-3 flex flex-row items-center'>
            <InputField
              register={register('age', {
                required: '생년월일을 입력해주세요.',
                pattern: {
                  value: /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/,
                  message: '유효한 생년월일을 입력해주세요. (YYYYMMDD)',
                },
              })}
              id='age'
              type='text'
              maxLength={8}
              placeholder='생년월일(YYYYMMDD)'
              icon={<FiActivity className='absolute ml-2.5 text-sm text-[#A9A9A9]' />}
            />
            <GenderButton gender='남' selected={watch('gender') === '남'} onClick={() => onSelectedGender('남')} />
            <GenderButton gender='여' selected={watch('gender') === '여'} onClick={() => onSelectedGender('여')} />
          </div>
          <p className='!mt-1.5 text-xs text-red-400'>{errors.age?.message}</p>
          <div>
            <InputField
              register={register('phoneNumber', {
                required: '휴대폰번호를 입력해주세요.',
              })}
              id='phoneNumber'
              type='text'
              maxLength={11}
              placeholder='휴대폰번호'
              icon={<BsPhone className='absolute ml-2.5 text-sm text-[#A9A9A9]' />}
            />
          </div>
          <p className='!mt-1.5 text-xs text-red-400'>{errors.phoneNumber?.message}</p>
          <p className='!my-4 flex justify-end text-xs text-[#A9A9A9]'>
            앗! 계정이 있으신가요?
            <Link
              href={'/login'}
              onClick={event => event.stopPropagation()}
              className='px-1.5 text-[13px] text-[#33CC99] hover:underline'>
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
