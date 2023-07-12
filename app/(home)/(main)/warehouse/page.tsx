'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Layout from '@/app/components/organism/layout/Layout'
import boxImg from '@/app/assets/image/box.png'

const WareHouse = () => {
  return (
    <Layout hasHeader seoTitle={'창고공간'}>
      <div className='h-inherit mt-8 flex items-center justify-center'>
        <div className='w-300 mx-auto grid grid-cols-2 grid-rows-[minmax(0,1fr)] items-center justify-center gap-x-3 gap-y-8'>
          <Link href={`/warehouse/item/${1}`} className='block px-4 pt-4'>
            <div className='relative flex h-32 w-32 items-center justify-center rounded-md bg-[#33cc99] shadow-sm hover:bg-[#32D7A0] hover:text-white hover:transition-all hover:duration-200'>
              <Image src={boxImg} alt={''} width={112} height={112} priority />
              <h1 className='absolute text-lg font-semibold'>{'창고1'}</h1>
            </div>
          </Link>
          <Link href={`/warehouse/item/${2}`} className='block px-4 pt-4'>
            <div className='flex h-32 w-32 items-center justify-center rounded-md bg-[#33cc99] shadow-sm hover:bg-[#32D7A0] hover:text-white hover:transition-all hover:duration-200'>
              <Image src={boxImg} alt={''} width={112} height={112} priority />
              <h1 className='absolute text-lg font-semibold'>{'창고2'}</h1>
            </div>
          </Link>
          <Link href={`/warehouse/item/${3}`} className='block px-4 pt-4'>
            <div className='flex h-32 w-32 items-center justify-center rounded-md bg-[#33cc99] shadow-sm hover:bg-[#32D7A0] hover:text-white hover:transition-all hover:duration-200'>
              <Image src={boxImg} alt={''} width={112} height={112} priority />
              <h1 className='absolute text-lg font-semibold'>{'창고3'}</h1>
            </div>
          </Link>
          <div className={'block px-4 pt-4'}>
            <button className='flex h-32 w-32 items-center justify-center rounded-md border border-[#33cc99] shadow-sm hover:border-none hover:bg-[#32D7A0] hover:text-white hover:transition-all hover:duration-200'>
              <h1 className='text-lg font-medium'>{'창고 추가'}</h1>
            </button>
          </div>
          {/* {streams.map(stream => ( */}
          {/*  <Link key={stream.id} href={`/streams/${stream.id}`} className='block px-4  pt-4'> */}
          {/*    <div className='aspect-video w-full rounded-md bg-slate-300 shadow-sm' /> */}
          {/*    <h1 className='mt-2 text-2xl font-bold text-gray-900'>{stream.name}</h1> */}
          {/*  </Link> */}
          {/* ))} */}
          {/* <Link href={`/warehouse/item/${3}`} className='block px-4 pt-4'> */}
          {/*  <div className='flex h-28 w-28 items-center justify-center rounded-md bg-slate-300 shadow-sm'> */}
          {/*    <h1 className='mt-2 text-xl font-semibold text-gray-900'>{'창고3'}</h1> */}
          {/*  </div> */}
          {/* </Link> */}
        </div>
      </div>
    </Layout>
  )
}

export default WareHouse
