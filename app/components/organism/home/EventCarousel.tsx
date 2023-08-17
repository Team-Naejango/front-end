'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SwiperCore, { A11y, Autoplay } from 'swiper'
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react'
import { Swiper as SwiperClass } from 'swiper/types'

import { HOMEIMAGES } from '@/app/libs/client/constants/static'
import { cls } from '@/app/libs/client/utils/util'

import 'swiper/css'

const EventCarousel = () => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const totalSlides = HOMEIMAGES.filter(value => value.ing).length

  SwiperCore.use([A11y, Autoplay])

  const onSlideIndexChanged = () => {
    if (swiper) {
      setActiveIndex(swiper.realIndex)
    }
  }

  const swiperParams: SwiperProps = {
    modules: [A11y, Autoplay],
    slidesPerView: 1,
    autoplay: { delay: 3000, disableOnInteraction: false },
    loop: true,
    onSwiper: setSwiper,
    onSlideChange: onSlideIndexChanged,
  }

  return (
    <Swiper {...swiperParams} className={'!absolute left-0 top-[90px] w-full rounded-[1rem]'}>
      {HOMEIMAGES.map(data => {
        return (
          data.ing && (
            <SwiperSlide key={data.title}>
              <Link href={'/events'}>
                <Image
                  src={data.src}
                  priority
                  quality={100}
                  placeholder='blur'
                  blurDataURL={data.blurUrl}
                  alt={'여행 이벤트 이미지'}
                  width={375}
                  height={300}
                  style={{ objectFit: 'cover', height: '300px' }}
                />
                <p
                  className={cls(
                    'absolute bottom-0 left-0 z-20 whitespace-pre-wrap px-5 py-8 text-[26px] font-extrabold leading-normal text-white',
                    data.position ? 'bottom-0 right-0 text-right' : ''
                  )}>
                  {data.title}
                </p>
              </Link>
            </SwiperSlide>
          )
        )
      })}
      <span
        className={
          'absolute left-5 top-5 z-30 rounded-[30px] border border-white px-2.5 py-[1px] text-[10px] text-white'
        }>
        {`${activeIndex + 1} / ${totalSlides}`}
      </span>
    </Swiper>
  )
}

export default EventCarousel
