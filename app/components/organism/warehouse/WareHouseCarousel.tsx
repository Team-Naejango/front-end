'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SwiperCore, { Navigation, A11y } from 'swiper'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperClass } from 'swiper/types'
import { BsPlusSquare } from 'react-icons/bs'

import 'swiper/css'
import 'swiper/css/navigation'

import { cls } from '@/app/libs/client/utils/util'
import { StorageInfo } from '@/app/apis/types/domain/warehouse/warehouse'
import { E_SLIDE_TYPE, SLIDE_TYPE } from '@/app/libs/client/constants/code'

const WareHouseCarousel = ({
  datas,
  onClick,
  onSlideChange,
}: {
  datas: StorageInfo | undefined
  onClick: () => void
  onSlideChange: (index: number) => void
}) => {
  SwiperCore.use([Navigation, A11y])
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)

  const totalSlides = datas?.result.length || 0
  const findLastIdx = swiper && swiper.realIndex === totalSlides - 1

  // 이전버튼 비활성화 상태
  const updatePreviousDisableButton = useCallback(() => {
    if (swiper && swiper.realIndex === 0) {
      document.querySelector('.swiper-button-prev')?.classList.add('swiper-button-disabled')
    } else {
      document.querySelector('.swiper-button-prev')?.classList.remove('swiper-button-disabled')
    }
  }, [swiper, findLastIdx])

  // 슬라이드 조건
  const onSlideControls = () => {
    if (swiper) {
      onSlideChange(swiper.realIndex)
      updatePreviousDisableButton()

      const { realIndex, slides } = swiper
      swiper.allowSlidePrev = realIndex !== 0
      swiper.allowSlideNext = realIndex !== slides.length - 1
    }
  }

  // 이전버튼 막음
  const disablePreviousSlide = () => {
    if (swiper) {
      const { realIndex } = swiper
      swiper.allowSlidePrev = realIndex !== 0
    }
  }

  // 슬라이드 타입
  const onSlideSwiper = (slide: E_SLIDE_TYPE) => {
    if (!swiper) return

    if (slide) {
      swiper.slidePrev()
    } else {
      swiper.slideNext()
    }
  }

  // 슬라이드 파라미터
  const swiperParams: SwiperProps = {
    modules: [Navigation, A11y],
    slidesPerView: 1,
    loop: false,
    navigation: {
      // prevEl: '.swiper-button-prev',
      // nextEl: '.swiper-button-next',
      disabledClass: 'swiper-button-disabled',
    },
    onSwiper: setSwiper,
    onSlideChange: onSlideControls,
    onTouchStart: () => {
      disablePreviousSlide()
    },
    onTouchEnd: () => {
      updatePreviousDisableButton()
    },
  }

  useEffect(() => {
    updatePreviousDisableButton()
  }, [updatePreviousDisableButton])

  return (
    <Swiper {...swiperParams} className={'mt-16 h-40 w-full'}>
      {datas?.result === undefined || datas?.result.length === 0 ? (
        <SwiperSlide className={'slider_fade'}>
          <div className='relative mx-auto flex h-40 w-40 items-center justify-center rounded-md border border-[#ccc] bg-white shadow-sm hover:border-[#32D7A0] hover:text-white hover:transition-all hover:duration-200'>
            <Image
              priority
              src={'https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/assets/storage.png'}
              alt={'창고 이미지'}
              width={144}
              height={144}
              style={{ objectFit: 'cover', margin: '0 auto', height: '100%', padding: '4px', paddingBottom: '6px' }}
              quality={100}
            />
          </div>
          <div className='absolute left-5 top-1/2'>
            <svg
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-[#ccc] hover:text-[#aaa]'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
            </svg>
          </div>
          <div className={'absolute right-5 top-1/2 block cursor-pointer'}>
            <BsPlusSquare className='h-6 w-6 text-[#222] hover:text-[#33CC99]' onClick={onClick} />
          </div>
        </SwiperSlide>
      ) : (
        datas?.result.length !== 0 &&
        datas?.result.map(data => {
          return (
            <SwiperSlide key={data.storageId} className={'slider_fade'}>
              <div className='relative mx-auto flex h-40 w-40 items-center justify-center rounded-md border border-[#ccc] p-2.5 shadow-sm hover:text-white hover:transition-all hover:duration-200'>
                <Link
                  href={{
                    pathname: '/warehouse/detail/edit',
                    query: {
                      storage: data.storageId,
                      name: data.name,
                      count: swiper && swiper.realIndex,
                    },
                  }}>
                  <Image
                    priority
                    src={`https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/upload/warehouse/${encodeURIComponent(
                      data.imgUrl
                    )}`}
                    alt={'창고 이미지'}
                    width={144}
                    height={144}
                    style={{ objectFit: 'cover', width: '144px', height: '144px', margin: '0 auto' }}
                    quality={100}
                  />
                </Link>
              </div>
              <div className='swiper-button-prev absolute left-5 top-1/2'>
                <svg
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  className={cls('h-6 w-6 hover:text-[#33CC99]', totalSlides === 1 ? 'text-[#ccc]' : 'text-[#222]')}
                  onClick={() => onSlideSwiper(SLIDE_TYPE.이전)}>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                </svg>
              </div>
              <div className={'swiper-button-next absolute right-5 top-1/2 block cursor-pointer'}>
                {findLastIdx ? (
                  <BsPlusSquare className='h-6 w-6 text-[#222] hover:text-[#33CC99]' onClick={onClick} />
                ) : (
                  <svg
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 text-[#222] hover:text-[#33CC99]'
                    onClick={() => onSlideSwiper(SLIDE_TYPE.다음)}>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                  </svg>
                )}
              </div>
            </SwiperSlide>
          )
        })
      )}
    </Swiper>
  )
}

export default WareHouseCarousel
