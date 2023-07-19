'use client'

import React, { useState, useEffect, ChangeEvent } from 'react'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { BiUserPin } from 'react-icons/bi'
import { FiActivity } from 'react-icons/fi'
import { BsPhone } from 'react-icons/bs'

import Button from '@/app/components/atom/Button'
import InputField from '@/app/components/atom/InputField'
import GenderButton from '@/app/components/atom/GenderButton'
import Layout from '@/app/components/organism/layout/Layout'
import TextArea from '@/app/components/atom/TextArea'
import InputFile from '@/app/components/atom/InputFile'

interface EditProfileForm {
  age: number
  gender: string
  nickname: string
  intro: string
  phoneNumber: string
  imageFile: FileList
}

const EditProfile = () => {
  const [imageFile, setImageFile] = useState<FileList | null>(null)
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>('')

  const REGION = process.env.NEXT_PUBLIC_AWS_REGION
  const ACCESS_KEY_ID = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID
  const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY_ID

  const {
    register,
    watch,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<EditProfileForm>()
  const nickname = watch('nickname')

  const uploadS3 = async (file: File) => {
    const s3Client = new S3Client({
      region: REGION,
      credentials: {
        accessKeyId: ACCESS_KEY_ID!,
        secretAccessKey: SECRET_ACCESS_KEY!,
      },
    })

    try {
      const command = new PutObjectCommand({
        Bucket: 'naejango-s3-image',
        Key: `upload/${file.name}`,
        Body: file,
        ACL: 'public-read',
      })
      const response = await s3Client.send(command)
      console.log('업로드', response)
    } catch (error) {
      console.error('S3 업로드 에러:', error)
    }
  }

  let imgSizeConverted = ''
  const limitedFileSize = (file: File) => {
    const imgSize = file.size
    const maxSize = 1024 * 1024 // 1MB

    if (imgSize >= maxSize) {
      toast.error('이미지 용량은 1MB 이내로 등록 가능합니다.')
      return false
    }

    if (imgSize < maxSize) {
      if (imgSize < 1024) {
        imgSizeConverted = imgSize + 'bytes'
      } else if (imgSize >= 1024 && imgSize < 1048576) {
        imgSizeConverted = (imgSize / 1024).toFixed(1) + 'KB'
      } else if (imgSize >= 1048576) {
        imgSizeConverted = (imgSize / 1048576).toFixed(1) + 'MB'
      }
    }
    return true
  }

  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0]
    const fileExt = file?.name.split('.').pop()

    if (!file) return
    if (!['jpeg', 'png', 'jpg', 'JPG', 'PNG', 'JPEG'].includes(fileExt!)) {
      toast.error('jpg, png, jpg 파일만 업로드가 가능합니다.')
      event.target.value = ''
      return
    }

    if (!limitedFileSize(file)) {
      event.target.value = ''
      return
    }

    const reader = new FileReader()
    reader.addEventListener('load', () => {
      setImageSrc(reader.result)
      setImageFile(event.target.files)
    })
    reader.readAsDataURL(file)
  }

  const onValid = async () => {
    if (!imageSrc) {
      toast.error('이미지를 등록해 주세요.')
      return
    }

    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0]
      await uploadS3(file)
    }
  }

  const onUserNameValidation = (event: React.MouseEvent) => {
    event.preventDefault()
    if (nickname === '') return false

    // query mutation api call
    // mutateNickname(watch('nickname'))
  }

  const onSelectedGender = (gender: '남' | '여') => {
    setValue('gender', gender)
  }

  return (
    <Layout canGoBack seoTitle={'프로필'}>
      <div className='mt-16'>
        <form onSubmit={handleSubmit(onValid)} className='space-y-4 px-4'>
          <div className='mb-12 flex items-center justify-center gap-3'>
            {imageFile ? (
              <Image
                src={URL.createObjectURL(imageFile[0])}
                width={'100'}
                height={'100'}
                alt='이미지 미리보기'
                className={'h-24 w-24 rounded-full bg-gray-300 object-cover'}
              />
            ) : (
              <div className='h-24 w-24 rounded-full bg-gray-300' />
            )}
            <InputFile id='picture' {...register('imageFile')} onChange={e => onUpload(e)} />
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
