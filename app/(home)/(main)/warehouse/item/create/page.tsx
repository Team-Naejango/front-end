'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { GrFormNext } from 'react-icons/gr'

import { CATEGORIES, KEEP_TYPES, STORAGES } from '@/app/libs/client/constants/warehouse'
import Layout from '@/app/components/organism/layout/Layout'
import InputField from '@/app/components/atom/InputField'
import Button from '@/app/components/atom/Button'
import TextArea from '@/app/components/atom/TextArea'
import SelectBox from '@/app/components/atom/SelectBox'
import MultiSelectBox from '@/app/components/atom/MultiSelectBox'
import mapIcon from '@/app/assets/image/map.svg'

interface ItemProps {
  name: string
  price: number
  description: string
  coords: {
    latitude: number
    longitude: number
  }
  option: {
    quantity: number
    status: string
    change: string
  }
}

const CreateItem = () => {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<{ name: string }>(CATEGORIES[0])
  const [selectedStorage, setSelectedStorage] = useState<{ id: number; name: string }[]>([STORAGES[0]])
  const [selectedType, setSelectedType] = useState<{ name: string }>(KEEP_TYPES[0])

  const { register, handleSubmit } = useForm<ItemProps>()

  const onValid = (data: ItemProps) => {}

  const onClickShowOption = () => {}

  return (
    <Layout canGoBack title={'아이템 등록'}>
      <form className='mt-12 space-y-4 p-2' onSubmit={handleSubmit(onValid)}>
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
          register={register('name', { required: true })}
          label='상품명'
          placeholder='상품명'
          essential
        />
        <SelectBox
          title={'카테고리'}
          data={CATEGORIES}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
          essential
        />
        <TextArea
          register={register('description', { required: true })}
          label='상품설명'
          placeholder='상품설명'
          essential
        />
        <InputField
          type='text'
          register={register('price', { required: true })}
          label='가격'
          placeholder='가격(원)'
          essential
        />
        <MultiSelectBox
          title={'창고선택'}
          data={STORAGES}
          selected={selectedStorage}
          setSelected={setSelectedStorage}
          essential
        />
        <SelectBox title={'분류'} data={KEEP_TYPES} selected={selectedType} setSelected={setSelectedType} essential />
        <InputField
          type='text'
          label={'위치'}
          value={'지역설정안함'}
          register={register('coords', { required: true })}
          className={'!indent-6'}
          essential
          icon={
            <>
              <Image src={mapIcon} alt={'지도 아이콘'} className='absolute ml-2.5 text-sm text-[#A9A9A9]' />
              <GrFormNext className='absolute right-2 cursor-pointer text-xl text-[#A9A9A9]' />
            </>
          }
        />
        <InputField
          type='text'
          label={'옵션'}
          value={'수량 1 / 중고상품 / 교환불가'}
          register={register('option', { required: true })}
          className={'!indent-0'}
          icon={<GrFormNext className='absolute right-2 cursor-pointer text-xl text-[#A9A9A9]' />}
          onClick={onClickShowOption}
          essential
        />
        <Button text={'등록'} />
      </form>
    </Layout>
  )
}

export default CreateItem
