'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperClass } from 'swiper/types'
import { BsPlusSquare } from 'react-icons/bs'

import { wareHouseImagesData } from '@/app/libs/client/utils/images'

import 'swiper/css'
import 'swiper/css/navigation'

const WareHouseCarousel = () => {
  const router = useRouter()
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const totalSlides = wareHouseImagesData.length
  const findLastIdx = activeIndex === totalSlides - 1

  SwiperCore.use([Navigation])

  const updatePrevDisabledState = useCallback(() => {
    if (swiper && swiper.realIndex === 0) {
      document.querySelector('.swiper-button-prev')?.classList.add('swiper-button-disabled')
    } else {
      document.querySelector('.swiper-button-prev')?.classList.remove('swiper-button-disabled')
    }
  }, [swiper])

  const onSlideCurrentIdx = () => {
    if (swiper) {
      setActiveIndex(swiper.realIndex)
      updatePrevDisabledState()

      const { realIndex, slides } = swiper
      swiper.allowSlidePrev = realIndex !== 0
      swiper.allowSlideNext = realIndex !== slides.length - 1
    }
  }

  const onTouchCurrentIdx = () => {
    if (swiper) {
      const { realIndex } = swiper
      if (swiper) swiper.allowSlidePrev = realIndex !== 0
    }
  }

  const swiperParams: SwiperProps = {
    modules: [Navigation, Pagination, A11y],
    slidesPerView: 1,
    loop: true,
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',
      disabledClass: 'swiper-button-disabled',
    },
    onSwiper: setSwiper,
    onSlideChange: onSlideCurrentIdx,
    onTouchStart: () => {
      onTouchCurrentIdx()
    },
    onTouchEnd: () => {
      updatePrevDisabledState()
    },
  }

  useEffect(() => {
    updatePrevDisabledState()
  }, [updatePrevDisabledState])

  return (
    <Swiper {...swiperParams} className={'mt-20 h-40 w-full'}>
      {wareHouseImagesData.map(data => {
        return (
          <SwiperSlide key={data.title} className={'slider_fade'}>
            <div className='relative mx-auto flex h-40 w-40 items-center justify-center rounded-md bg-[#33cc99] shadow-sm hover:bg-[#32D7A0] hover:text-white hover:transition-all hover:duration-200'>
              <Link href={`/warehouse/item/${data.id}`}>
                <Image
                  src={data.src}
                  alt={data.title}
                  width={144}
                  height={144}
                  style={{ objectFit: 'cover', margin: '0 auto' }}
                  quality={100}
                  priority
                />
                <span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-semibold'>
                  {data.title}
                </span>
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
                <BsPlusSquare
                  className='h-6 w-6 text-[#222] hover:text-[#33CC99]'
                  onClick={() => router.push('/warehouse/edit')}
                />
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
