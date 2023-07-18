'use client'

import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiUserPin } from 'react-icons/bi'
import { FiActivity } from 'react-icons/fi'
import AWS from 'aws-sdk'
import { toast } from 'react-hot-toast'
import Image from 'next/image'

import Button from '@/app/components/atom/Button'
import InputField from '@/app/components/atom/InputField'
import GenderButton from '@/app/components/atom/GenderButton'
import Layout from '@/app/components/organism/layout/Layout'
import TextArea from '@/app/components/atom/TextArea'

interface EditProfileForm {
  age: number
  gender: string
  nickname: string
  intro: string
  phoneNumber: string
  avatar?: FileList
}

interface EditProfileResponse {
  ok: boolean
  error?: string
}

const EditProfile = () => {
  const [gender, setGender] = useState<string>('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [imageFile, setImageFile] = useState<any>('')
  const [imageSrc, setImageSrc] = useState<any>(null)

  const {
    register,
    watch,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EditProfileForm>()

  const nickname = watch('nickname')
  const avatar = watch('avatar')

  const uploadS3 = (formData: any) => {
    const REGION = process.env.REACT_APP_REGION
    const ACESS_KEY_ID = process.env.REACT_APP_ACCESS_KEY_ID
    const SECRET_ACESS_KEY_ID = process.env.REACT_APP_SECRET_ACCESS_KEY_ID

    AWS.config.update({
      region: REGION,
      accessKeyId: ACESS_KEY_ID,
      secretAccessKey: SECRET_ACESS_KEY_ID,
    })

    const myBucket = new AWS.S3.ManagedUpload({
      params: {
        ACL: 'public-read',
        Bucket: '버킷명',
        Key: `upload/${imageFile.name}`,
        Body: imageFile,
      },
    })

    myBucket.promise().then(() => {
      console.log('업로드')
    })
  }

  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    const fileExt = file.name.split('.').pop()

    // 확장자 제한
    if (!['jpeg', 'png', 'jpg', 'JPG', 'PNG', 'JPEG'].includes(fileExt!)) {
      toast.error('jpg, png, jpg 파일만 업로드가 가능합니다.')
      e.target.value = ''
      return
    }

    // 파일 리더
    const reader = new FileReader()
    reader.readAsDataURL(file)

    // 파일 업로드
    return new Promise<void>(resolve => {
      reader.onload = () => {
        // 이미지 경로 선언
        setImageSrc(reader.result || null)
        // 이미지 파일 선언
        setImageFile(URL.createObjectURL(file))
        resolve()
      }
      URL.revokeObjectURL(String(file))
    })
  }

  const onValid = ({ nickname, age, gender, avatar }: EditProfileForm) => {
    // if (loading) return
    if (!imageSrc) {
      toast.error('이미지를 등록해 주세요.')
      return
    }

    const formData = new FormData()
    formData.append('file', imageFile)
    formData.append('file', avatar![0])
    formData.append('name', imageFile.name)

    uploadS3(formData)
  }

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0]
      setImageFile(URL.createObjectURL(file))

      return () => {
        URL.revokeObjectURL(String(file))
      }
    }
  }, [avatar])

  useEffect(() => {
    setGender(gender)
  }, [gender])

  const onUserNameValidation = (event: React.MouseEvent) => {
    event.preventDefault()
    if (nickname === '') return false
    // query mutation api call
    // mutateNickname(watch('nickname'))
  }

  const onSelectedGender = (gender: '남' | '여') => {
    setGender(gender)
  }

  return (
    <Layout canGoBack seoTitle={'프로필'}>
      <div className='mt-16'>
        <form onSubmit={handleSubmit(onValid)} className='space-y-4 px-4'>
          <div className='mb-12 flex flex-col items-center'>
            {imageFile ? (
              <Image
                src={imageFile}
                width={'100'}
                height={'100'}
                alt='이미지 미리보기'
                className={'h-20 w-20 rounded-full bg-gray-300 object-cover'}
              />
            ) : (
              <div className='h-20 w-20 rounded-full bg-gray-300' />
            )}
            <label
              htmlFor='picture'
              className='cursor-pointer px-3 py-2 text-sm font-normal underline hover:text-[#666]'>
              편집
              <input
                hidden
                id='picture'
                type='file'
                accept='image/*'
                // multiple
                {...register('avatar')}
                ref={el => {
                  inputRef.current = el
                }}
                onChange={e => onUpload(e)}
              />
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
            <GenderButton gender='남' selected={gender === '남'} onClick={() => onSelectedGender('남')} />
            <GenderButton gender='여' selected={gender === '여'} onClick={() => onSelectedGender('여')} />
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
            />
          </div>
          <p className='!mt-1.5 text-xs text-red-400'>{errors.phoneNumber?.message}</p>
          <TextArea
            register={register('intro', {
              required: '자기소개를 입력해주세요.',
            })}
            placeholder={'자기소개'}
            rows={3}
          />
          <p className='!mt-0 text-xs text-red-400'>{errors.intro?.message}</p>
          <Button smail text='저장' className={'!mx-auto mt-4 block'} />
        </form>
      </div>
    </Layout>
  )
}

export default EditProfile
