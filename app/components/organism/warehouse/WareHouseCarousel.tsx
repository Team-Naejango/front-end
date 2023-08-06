'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SwiperCore, { Navigation, A11y } from 'swiper'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperClass } from 'swiper/types'
import { BsPlusSquare } from 'react-icons/bs'

import { wareHouseImagesData } from '@/app/libs/client/utils/images'

import 'swiper/css'
import 'swiper/css/navigation'
import { StorageParam } from '@/app/apis/domain/warehouse/warehouse'
import uuid from 'react-uuid'

const WareHouseCarousel = ({ datas, onClick }: { datas: StorageParam; onClick: () => void }) => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const totalSlides = [datas].length
  const findLastIdx = activeIndex === totalSlides - 1

  SwiperCore.use([Navigation, A11y])

  const updatePrevDisabledState = useCallback(() => {
    if (swiper && swiper.realIndex === 0) {
      document.querySelector('.swiper-button-prev')?.classList.add('swiper-button-disabled')
    } else {
      document.querySelector('.swiper-button-prev')?.classList.remove('swiper-button-disabled')
    }
  }, [swiper, activeIndex])

  const onSlideControls = () => {
    if (swiper) {
      setActiveIndex(swiper.realIndex)
      updatePrevDisabledState()

      const { realIndex, slides } = swiper
      swiper.allowSlidePrev = realIndex !== 0
      swiper.allowSlideNext = realIndex !== slides.length - 1
    }
  }

  const prevSlideBlocked = () => {
    if (swiper) {
      const { realIndex } = swiper
      swiper.allowSlidePrev = realIndex !== 0
    }
  }

  const swiperParams: SwiperProps = {
    modules: [Navigation, A11y],
    slidesPerView: 1,
    loop: true,
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',
      disabledClass: 'swiper-button-disabled',
    },
    onSwiper: setSwiper,
    onSlideChange: onSlideControls,
    onTouchStart: () => {
      prevSlideBlocked()
    },
    onTouchEnd: () => {
      updatePrevDisabledState()
    },
  }

  useEffect(() => {
    updatePrevDisabledState()
  }, [updatePrevDisabledState])

  console.log('datas:', datas)

  return (
    <Swiper {...swiperParams} className={'mt-20 h-40 w-full'}>
      {[datas]?.map((data: StorageParam) => {
        return (
          <SwiperSlide key={uuid()} className={'slider_fade'}>
            <div className='relative mx-auto flex h-40 w-40 items-center justify-center rounded-md bg-[#33cc99] shadow-sm hover:bg-[#32D7A0] hover:text-white hover:transition-all hover:duration-200'>
              <Link href={`/warehouse/detail/1`}>
                <Image
                  priority
                  src={
                    data?.imgUrl === null
                      ? 'https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/assets/box.png'
                      : `https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/upload/warehouse/${data?.imgUrl}`
                  }
                  alt={'창고 이미지'}
                  width={144}
                  height={144}
                  style={{ objectFit: 'cover', margin: '0 auto' }}
                  quality={100}
                />
                {/* <span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-semibold'> */}
                {/*  {data?.name} */}
                {/* </span> */}
              </Link>
            </div>
            <div className='swiper-button-prev absolute left-5 top-1/2'>
              <svg
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 text-[#222]'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
              </svg>
            </div>
            <div
              className={`swiper-button-next cursor-pointer, absolute right-5 top-1/2 ${findLastIdx ? 'block' : ''}`}>
              {findLastIdx ? (
                <BsPlusSquare className='h-6 w-6 text-[#222] hover:text-[#33CC99]' onClick={onClick} />
              ) : (
                <svg
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 text-[#222]'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                </svg>
              )}
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

export default WareHouseCarousel
