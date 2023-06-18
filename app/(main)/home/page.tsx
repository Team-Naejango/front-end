'use client'

import React from 'react'

import Carousel from '@/app/components/molecule/slide/Carousel'

import trip from '@/app/assets/image/event_trip.png'
import basket from '@/app/assets/image/event_basket.png'

const Home = () => {
  return (
    <div className={'flex h-auto items-center justify-center'}>
      <Carousel />
    </div>
  )
}

export default Home
