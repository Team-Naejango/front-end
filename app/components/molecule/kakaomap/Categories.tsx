'use client'

import React, { useState, Dispatch, SetStateAction } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { A11y, Navigation } from 'swiper'
import { Swiper as SwiperClass } from 'swiper/types'
import { SwiperProps } from 'swiper/react/swiper-react'
import { useQuery } from '@tanstack/react-query'

import 'swiper/css'

import { cls } from '@/app/libs/client/utils/util'
import { CATEGORY } from '@/app/libs/client/reactQuery/queryKey/common'

import { category } from '@/app/apis/domain/common/category'

const Categories = ({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: { name: string } | undefined
  setSelectedCategory: Dispatch<SetStateAction<{ name: string }>>
}) => {
  SwiperCore.use([Navigation, A11y])
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)

  // 카테고리 리스트
  const { data: { data: categories } = {} } = useQuery([CATEGORY.조회], category)

  // 카테고리 선택
  const onSelectCategory = (category: string) => {
    setSelectedCategory({ name: category })
  }

  // 다음 슬라이드
  const onNextSwiper = () => {
    if (swiper) {
      const currentSlideIndex = swiper.activeIndex
      const numSlides = categories?.result.length || 0
      const nextSlideIndex = (currentSlideIndex + 4) % numSlides
      swiper.slideTo(nextSlideIndex)
    }
  }

  // 슬라이드 파라미터
  const swiperParams: SwiperProps = {
    modules: [Navigation, A11y],
    loop: true,
    slidesPerView: 4,
    spaceBetween: 14,
    width: 300,
    navigation: {
      nextEl: '.swiper-button-next',
    },
    onSwiper: setSwiper,
  }

  return (
    <div className={'mt-2 flex items-center'}>
      <Swiper {...swiperParams}>
        <ul>
          {categories?.result.map(data => {
            return (
              <SwiperSlide key={data.categoryId}>
                <li
                  role='presentation'
                  className={cls(
                    'cursor-pointer rounded border border-[#e5e7eb] py-1.5 text-center text-xs hover:underline hover:underline-offset-2',
                    data.categoryName === selectedCategory?.name ? '!border-[#32D7A0]' : '',
                    data.categoryName.length > 4 ? 'whitespace-nowrap' : ''
                  )}
                  onClick={() => onSelectCategory(data.categoryName)}>
                  {data.categoryName}
                </li>
              </SwiperSlide>
            )
          })}
        </ul>
      </Swiper>
      <div role={'presentation'} className={'!block'} onClick={onNextSwiper}>
        <button className={'ml-1 whitespace-nowrap hover:underline'}>&rarr;</button>
      </div>
    </div>
  )
}

export default Categories
