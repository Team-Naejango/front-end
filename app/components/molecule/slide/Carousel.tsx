'use client'

import React, { useRef } from 'react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import trip from '@/app/assets/image/event_trip.png'
import trip2 from '@/app/assets/image/event_trip_02.png'
import trip3 from '@/app/assets/image/event_trip_03.png'
import trip4 from '@/app/assets/image/event_trip_04.png'
import basket from '@/app/assets/image/event_basket.png'

const Carousel = () => {
  SwiperCore.use([Navigation, Autoplay])
  const swiperRef = useRef<SwiperCore>()

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      loop
      autoplay={{ delay: 3000 }}
      // pagination={{ clickable: true }}
      onSwiper={swiper => {
        swiperRef.current = swiper
      }}
      onSlideChange={() => console.log('slide change')}
      className={'!absolute left-0 top-[90px] w-full rounded-[30px]'}>
      <SwiperSlide>
        <Link href={'/event/1'}>
          <Image src={trip2} alt={'여행 이벤트 이미지'} width={375} height={375} />
          <p className={'absolute bottom-0 left-0 z-20 px-5 py-8 text-[26px] font-extrabold leading-normal text-white'}>
            내잔부 단독 특가
            <br />
            열기구 여행 오픈
          </p>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link href={'/event/2'}>
          <Image src={basket} alt={'장바구니 이벤트 이미지'} width={375} height={375} />
          <p
            className={
              'absolute bottom-0 right-0 z-20 px-5 py-8 text-right text-[26px] font-extrabold leading-normal text-white'
            }>
            오늘의 이벤트
            <br />
            장바구니 쓸어담자!
          </p>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link href={'/event/3'}>
          <Image src={trip3} alt={'여행 이벤트 이미지'} width={375} height={375} />
          <p className={'absolute bottom-0 left-0 z-20 px-5 py-8 text-[26px] font-extrabold leading-normal text-white'}>
            세계에 취하다,
            <br />
            ON THE TRIP!
          </p>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link href={'/event/4'}>
          <Image src={trip4} alt={'여행 이벤트 이미지'} width={375} height={375} />
          <p className={'absolute bottom-0 left-0 z-20 px-5 py-8 text-[26px] font-extrabold leading-normal text-white'}>
            세계 여행,
            <br />
            어디까지 가봤니?
          </p>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link href={'/event/5'}>
          <Image src={trip} alt={'여행 이벤트 이미지'} width={375} height={375} />
          <p className={'absolute bottom-0 left-0 z-20 px-5 py-8 text-[26px] font-extrabold leading-normal text-white'}>
            내잔부 단독 특가
            <br />
            열기구 여행 오픈
          </p>
        </Link>
      </SwiperSlide>
    </Swiper>
  )
}

export default Carousel
