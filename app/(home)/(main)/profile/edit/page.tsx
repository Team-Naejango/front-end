'use client'

import React, { useState, useEffect, ChangeEvent } from 'react'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ApiError } from 'next/dist/server/api-utils'
import { toast } from 'react-hot-toast'
import { BiUserPin } from 'react-icons/bi'
import { FiActivity } from 'react-icons/fi'
import { BsPhone } from 'react-icons/bs'

import Button from '@/app/components/atom/Button'
import InputField from '@/app/components/atom/InputField'
import GenderButton from '@/app/components/atom/GenderButton'
import Layout from '@/app/components/template/main/layout/Layout'
import TextArea from '@/app/components/atom/TextArea'
import InputFile from '@/app/components/atom/InputFile'
import { MemberInfo } from '@/app/apis/types/domain/auth/auth'
import { OAUTH } from '@/app/libs/client/reactQuery/queryKey'

import { modifyUserInfo, userInfo } from '@/app/apis/domain/profile/profile'
import { nickNameValidity } from '@/app/apis/domain/auth/auth'

interface EditProfileForm {
  birth: string
  gender: string
  nickname: string
  intro: string
  phoneNumber: string
  imageFile?: FileList
}

const EditProfile = () => {
  const query = useQueryClient()
  const router = useRouter()
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined)
  const [imageFile, setImageFile] = useState<FileList | null>(null)
  const [isNicknameDisabled, setIsNicknameDisabled] = useState<boolean>(false)
  const [selectedNickname, setSelectedNickname] = useState<string>('')

  const REGION = process.env.NEXT_PUBLIC_AWS_REGION
  const ACCESS_KEY_ID = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID
  const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY

  const {
    register,
    watch,
    handleSubmit,
    getValues,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm<EditProfileForm>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })
  const nickname = watch('nickname')

  const { data: _userInfo } = useQuery<{ user: MemberInfo }>([OAUTH.유저정보], () => userInfo())

  const { mutate: mutateUserInfoModify } = useMutation<{ user: MemberInfo }, ApiError, MemberInfo>(
    (params: MemberInfo) => modifyUserInfo({ ...params }),
    {
      onSuccess: () => {
        query.invalidateQueries([OAUTH.유저정보])
        toast.success('프로필이 변경되었습니다.')
        router.push('/profile')
      },
      onError: (error: ApiError) => {
        console.log('error:', error)
        toast.error(error.message)
      },
    }
  )

  // todo: API 나온 후 작업
  // const { mutate: mutateNickname } = useMutation(nickNameValidity, {
  //   onSuccess: () => {
  //     console.log('닉네임 사용 가능')
  //     setIsNicknameDisabled(true)
  //     setSelectedNickname(getValues('nickname'))
  //   },
  //   onError: (error: ApiError) => {
  //     console.log('error:', error)
  //     toast.error(error.message)
  //   },
  // })

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
        ContentType: file.type,
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
    console.log('event.target.files:', event.target.files)
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
      setImagePreview(reader.result as string)
      setImageFile(event.target.files)

      URL.revokeObjectURL(reader.result as string)
    })
    reader.readAsDataURL(file)
  }

  const onSubmit = async () => {
    if (!_userInfo) return

    if (!setImagePreview) {
      toast.error('이미지를 등록해주세요.')
      return
    }

    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0]
      await uploadS3(file)
    }

    const params: MemberInfo = {
      nickname: getValues('nickname'),
      gender: getValues('gender'),
      imgUrl: (imageFile! && imageFile[0].name) ?? _userInfo.user.imgUrl,
      birth: getValues('birth'),
      intro: getValues('intro'),
      phoneNumber: getValues('phoneNumber'),
    }

    console.log('params:', params)
    mutateUserInfoModify(params)
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
    reset(_userInfo?.user)

    if (_userInfo?.user?.imgUrl) {
      setImagePreview(_userInfo.user.imgUrl)
    }
  }, [_userInfo])

  console.log('imageFile:', watch('imageFile'))

  return (
    <Layout canGoBack title={'프로필 편집'} seoTitle={'프로필'}>
      <div className='mt-16'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 px-4'>
          <div className='mb-12 flex items-center justify-center gap-3'>
            {imageFile ? (
              <Image
                src={URL.createObjectURL(imageFile[0])}
                defaultValue={imagePreview}
                width={'100'}
                height={'100'}
                alt='이미지 미리보기'
                className={'h-24 w-24 rounded-full bg-gray-300 object-cover'}
              />
            ) : (
              <Image
                src={`${
                  _userInfo?.user.imgUrl === ''
                    ? 'https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/assets/face2%402x.png'
                    : `https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/upload/${_userInfo?.user.imgUrl}`
                }`}
                width={'100'}
                height={'100'}
                quality={100}
                alt='프로필 이미지'
                className={'h-24 w-24 rounded-full bg-gray-300 object-cover'}
              />
            )}
            <InputFile id='picture' {...register('imageFile')} onChange={event => onUpload(event)} />
          </div>
          <div className={'flex flex-row items-center'}>
            <InputField
              register={register('nickname', {
                required: '닉네임을 입력해주세요.',
                value: _userInfo?.user.nickname,
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
              register={register('birth', {
                required: '생년월일을 입력해주세요.',
                value: _userInfo?.user.birth,
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
          <p className='!mt-1.5 text-xs text-red-400'>{errors.birth?.message}</p>
          <div>
            <InputField
              register={register('phoneNumber', {
                required: '휴대폰번호를 입력해주세요.',
                value: _userInfo?.user.phoneNumber,
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
              required: '자기소개를 입력하세요.',
              value: _userInfo?.user.intro,
              maxLength: {
                value: 100,
                message: '100자 제한입니다.',
              },
            })}
            placeholder={'자기소개'}
          />
          <p className='!mt-0 text-xs text-red-400'>{errors.intro?.message}</p>
          <Button smail text='저장' className={'!mx-auto mt-4 block'} />
        </form>
      </div>
    </Layout>
  )
}

export default EditProfile
