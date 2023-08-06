'use client'

import React, { Dispatch, SetStateAction, useEffect } from 'react'
import gsap from 'gsap'

import Layout from '@/app/components/template/main/layout/Layout'
import SearchAddress, { AddressType } from '@/app/components/molecule/kakaomap/SearchAddress'
import Button from '@/app/components/atom/Button'

const SelectCoordinate = ({
  address,
  setAddress,
  onClick,
}: {
  address: AddressType
  setAddress: Dispatch<SetStateAction<AddressType>>
  onClick: (value?: any) => void
}) => {
  const pageAnimation = () => {
    gsap.fromTo(
      '.coord-wrapper',
      {
        x: '5%',
        duration: 0.5,
        opacity: 1,
      },
      {
        x: '0%',
        duration: 0.5,
        opacity: 1,
      }
    )
  }

  useEffect(() => {
    pageAnimation()
  }, [])

  return (
    <div className={'coord-wrapper fixed left-0 top-0 z-[9999] h-full w-full rounded-[30px] bg-white'}>
      <Layout canGoBack title={'선호 거래지역'} onClick={event => onClick(event)}>
        <div className={'mt-16 space-y-4 px-3 text-center'}>
          <SearchAddress address={address} setAddress={setAddress} />
          <Button small onClick={onClick} text={'선택'} />
        </div>
      </Layout>
    </div>
  )
}

export default SelectCoordinate
