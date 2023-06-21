'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SwiperCore, { Navigation, Pagination, A11y, Autoplay } from 'swiper'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperClass } from 'swiper/types'

import { imagesData } from '@/app/libs/client/utils/images'
import { cls } from '@/app/libs/client/utils/util'

const Carousel = () => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)

  SwiperCore.use([Navigation, Autoplay])

  const onSlideCurrentIdx = () => {
    if (swiper) {
      setActiveIndex(swiper.realIndex)
    }
  }

  const swiperParams: SwiperProps = {
    modules: [Navigation, Pagination, A11y, Autoplay],
    slidesPerView: 1,
    autoplay: { delay: 3000 },
    loop: true,
    onSwiper: setSwiper,
    onSlideChange: onSlideCurrentIdx,
  }

  return (
    <Swiper {...swiperParams} className={'!absolute left-0 top-[90px] w-full rounded-3xl'}>
      {imagesData.map((data, idx) => {
        return (
          <SwiperSlide key={data.src.src}>
            <Link href={`/event/${idx}`}>
              <Image
                src={data.src}
                alt={'여행 이벤트 이미지'}
                width={375}
                height={300}
                style={{ objectFit: 'cover', height: '300px' }}
                quality={100}
                placeholder='blur'
                blurDataURL={data.blurUrl}
              />
              <p
                className={cls(
                  'absolute bottom-0 left-0 z-20 whitespace-pre-wrap px-5 py-8 text-[26px] font-extrabold leading-normal text-white',
                  data.position ? 'bottom-0 right-0 text-right' : ''
                )}>
                {imagesData[idx]?.title}
              </p>
            </Link>
          </SwiperSlide>
        )
      })}
      <span
        className={
          'absolute left-5 top-5 z-30 rounded-[30px] border border-white px-2.5 py-[1px] text-[10px] text-white'
        }>
        {`${activeIndex + 1} / ${imagesData.length}`}
      </span>
    </Swiper>
  )
}

export default Carousel
