'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SwiperCore, { A11y, Autoplay } from 'swiper'
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react'
import { Swiper as SwiperClass } from 'swiper/types'

import 'swiper/css'

import { HOMEIMAGES } from '@/app/libs/client/constants/static'
import { cls } from '@/app/libs/client/utils/util'

const EventCarousel = () => {
  SwiperCore.use([A11y, Autoplay])
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const totalSlides = HOMEIMAGES.filter(value => value.ing).length

  // 활성화된 슬라이드 인덱스 감지
  const onSlideIndexChange = () => {
    if (swiper) {
      setActiveIndex(swiper.realIndex)
    }
  }

  // 슬라이드 파라미터
  const swiperParams: SwiperProps = {
    modules: [A11y, Autoplay],
    slidesPerView: 1,
    autoplay: { delay: 3000, disableOnInteraction: false },
    loop: true,
    onSwiper: setSwiper,
    onSlideChange: onSlideIndexChange,
  }

  return (
    <Swiper {...swiperParams} className={'!absolute left-0 top-0 w-full overflow-hidden rounded-xl'}>
      {HOMEIMAGES.map(data => {
        return (
          data.ing && (
            <SwiperSlide key={data.title}>
              <Link href={'/events'}>
                <Image
                  src={data.src}
                  quality={100}
                  placeholder='blur'
                  blurDataURL={data.blurUrl}
                  alt={'여행 이벤트 이미지'}
                  style={{ objectFit: 'cover', width: '375px', height: '260px' }}
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
