'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import Layout from '@/app/components/organism/layout/Layout'
import InputField from '@/app/components/atom/InputField'
import Button from '@/app/components/atom/Button'
import TextArea from '@/app/components/atom/TextArea'
import SelectBox from '@/app/components/atom/SelectBox'

const CATEGORY_DATA = [
  { name: '식품' },
  { name: '가전' },
  { name: '의류' },
  { name: '건강' },
  { name: '뷰티' },
  { name: '생활' },
]

const STORAGE_DATA = [{ name: 'BUY' }, { name: 'SELL' }]

interface CreateProductProps {
  name: string
  price: number
  description: string
}

const Create = () => {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_DATA[0])
  const [selectedStorage, setSelectedStorage] = useState(STORAGE_DATA[0])

  const { register, handleSubmit } = useForm<CreateProductProps>()

  const onValid = (data: CreateProductProps) => {}

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
        <InputField register={register('name', { required: true })} label='상품명' placeholder='상품명' type='text' />
        <SelectBox
          title={'카테고리'}
          data={CATEGORY_DATA}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />
        <TextArea register={register('description', { required: true })} label='상품설명' placeholder='상품명' />
        <InputField register={register('price', { required: true })} label='가격' placeholder='가격' type='text' />
        <SelectBox title={'저장창고'} data={STORAGE_DATA} selected={selectedStorage} setSelected={setSelectedStorage} />
        <Button text={'등록'} />
      </form>
    </Layout>
  )
}

export default Create
