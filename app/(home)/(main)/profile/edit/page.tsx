'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiUserPin } from 'react-icons/bi'
import { FiActivity } from 'react-icons/fi'

import Button from '@/app/components/atom/Button'
import InputField from '@/app/components/atom/InputField'
import GenderButton from '@/app/components/atom/GenderButton'
import Layout from '@/app/components/organism/layout/Layout'

interface EditProfileForm {
  nickname: string
  birth: number
  gender: string
  avatar?: FileList
  formErrors?: string
}

interface EditProfileResponse {
  ok: boolean
  error?: string
}

const EditProfile = () => {
  const [gender, setGender] = useState<string>('')
  const [isNicknameDisabled, setIsNicknameDisabled] = useState<boolean>(false)
  const [selectedNickname, setSelectedNickname] = useState<string>('')

  const [avatarPreview, setAvatarPreview] = useState('')
  // const { user } = useUser()

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<EditProfileForm>()

  const nickname = watch('nickname')
  const avatar = watch('avatar')

  // const [editProfile, { data, loading }] = useMutation<EditProfileResponse>(`/api/users/me`)

  const onValid = ({ nickname, birth, gender, avatar }: EditProfileForm) => {
    // if (loading) return
    // if (email === '' && phone === '' && name === '') {
    //   return setError('formErrors', {
    //     message: '이메일 또는 휴대폰 비빌번호를 알맞게 입력해주세요.',
    //   })
    // }
    // editProfile({
    //   email,
    //   phone,
    //   name,
    // })
  }

  const onUserNameValidation = (event: React.MouseEvent) => {
    // events.preventDefault()
    if (nickname === '') return false
    // query mutation api call
    // mutateNickname(watch('nickname'))
  }

  const onSelectedGender = (gender: '남' | '여') => {
    setGender(gender)
  }

  useEffect(() => {
    setGender(gender)
  }, [gender])

  useEffect(() => {
    // if (selectedNickname !== nickname) {
    //   setIsNicknameDisabled(true)
    // }
  }, [nickname, selectedNickname])

  // useEffect(() => {
  //   if (user?.nickname) setValue('nickname', user.name)
  //   if (user?.birth) setValue('birth', user.email)
  //   if (user?.gender) setValue('gender', user.phone)
  // }, [user, setValue])

  // useEffect(() => {
  //   if (data && !data.ok && data.error) {
  //     setError('formErrors', { message: data.error })
  //   }
  // }, [data, setError])

  // const form = new FormData()
  // form.append('file', avatar[0])
  // await fetch(uploadURL, {
  //   method: 'POST',
  //   body: form,
  // })

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0]
      setAvatarPreview(URL.createObjectURL(file))

      return () => {
        URL.revokeObjectURL(String(file))
      }
    }
  }, [avatar])

  return (
    <Layout canGoBack seoTitle={'프로필'}>
      <div className='mt-16'>
        <form onSubmit={handleSubmit(onValid)} className='space-y-4 px-4'>
          <div className='mb-12 flex flex-col items-center'>
            {avatarPreview ? (
              <img src={avatarPreview} alt='이미지 미리보기' className={'h-24 w-24 rounded-full bg-gray-300'} />
            ) : (
              <div className='h-20 w-20 rounded-full bg-gray-300' />
            )}
            <label
              htmlFor='picture'
              className='cursor-pointer px-3 py-2 text-sm font-normal underline hover:text-[#666]'>
              편집
              <input {...register('avatar')} id='picture' type='file' className='hidden' accept='image/*' />
            </label>
          </div>
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
              className={'!text-[13px]'}
            />
          </div>
          <p className='!mt-1.5 text-xs text-red-400'>{errors.nickname?.message}</p>
          <div className='!mt-3 flex flex-row items-center'>
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
          <Button text='저장' smail className={'!mx-auto !my-8 !block !w-20'} />
        </form>
      </div>
    </Layout>
  )
}

export default EditProfile
