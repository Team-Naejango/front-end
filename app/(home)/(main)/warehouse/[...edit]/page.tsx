'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { GrFormNext } from 'react-icons/gr'

import BackHeader from '@/app/components/template/main/header/BackHeader'
import { CRUD } from '@/app/libs/client/constants/code'
import InputField from '@/app/components/atom/InputField'
import TextArea from '@/app/components/atom/TextArea'
import Button from '@/app/components/atom/Button'
import mapIcon from '@/app/assets/image/map.svg'

interface CreateWarehouseProps {
  name: string
  description: string
  coords: {
    latitude: number
    longitude: number
  }
}

const WarehouseEdit = () => {
  const searchParams = useSearchParams()

  const crud = searchParams.get('crud')
  const seq = searchParams.get('seq')
  const isEditMode = (crud === CRUD.수정 && seq !== '') || false

  console.log('isEditMode:', isEditMode)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateWarehouseProps>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const onSubmit = (data: CreateWarehouseProps) => {}

  // useEffect(() => {
  //   if (isEditMode) {
  //   }
  // }, [editState])

  return (
    <>
      <BackHeader canGoBack title={`창고 ${isEditMode ? '편집' : '생성'}`} />
      <form className='mt-12 space-y-4 p-2' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor={'file'}
            className='flex h-48 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-gray-600 hover:border-[#32D7A0] hover:text-[#32D7A0]'>
            <svg className='h-12 w-12' stroke='currentColor' fill='none' viewBox='0 0 48 48' aria-hidden='true'>
              <path
                d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <input id={'file'} className='hidden' type='file' />
          </label>
        </div>
        <InputField
          type='text'
          register={register('name', { required: '창고명을 입력해주세요.' })}
          label='창고명'
          placeholder='창고명'
          essential
        />
        <p className='!mt-1.5 text-xs text-red-400'>{errors.name?.message}</p>
        <TextArea
          register={register('description', { required: '창고설명을 입력해주세요.' })}
          label='창고설명'
          placeholder='창고설명'
          essential
        />
        <p className='!mt-0 text-xs text-red-400'>{errors.description?.message}</p>
        <div className={'!mt-4'}>
          <InputField
            type='text'
            label={'위치'}
            placeholder={'지역설정안함'}
            register={register('coords', { required: '위치를 설정해주세요.' })}
            className={'!indent-6'}
            readOnly
            essential
            icon={
              <>
                <Image src={mapIcon} alt={'지도 아이콘'} className='absolute ml-2.5 text-sm text-[#A9A9A9]' />
                <GrFormNext className='absolute right-2 cursor-pointer text-xl text-[#A9A9A9]' />
              </>
            }
          />
        </div>
        <p className='!mt-1.5 text-xs text-red-400'>{errors.coords?.message}</p>
        <Button text={'등록'} />
      </form>
    </>
  )
}

export default WarehouseEdit
