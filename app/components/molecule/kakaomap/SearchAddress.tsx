'use client'

import React, { Dispatch, SetStateAction, useEffect, useLayoutEffect, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { useRecoilValue } from 'recoil'
import { CiSearch } from 'react-icons/ci'

import InputField from '@/app/components/atom/InputField'
import { locationState } from '@/app/store/atom'

/* global kakao, maps, daum */
import LatLng = kakao.maps.LatLng

declare global {
  interface Window {
    daum: any
  }
}

interface IAddr {
  address: string
}

export type AddressType = {
  value: string
  coords?: {
    latitude: number | null
    longitude: number | null
  }
}

const SearchAddress = ({
  address,
  setAddress,
}: {
  address: AddressType
  setAddress: Dispatch<SetStateAction<AddressType>>
}) => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null)
  const [markers, setMarkers] = useState<{ lat: number | null; lng: number | null }>()
  const userLocal = useRecoilValue<{ latitude: number; longitude: number }>(locationState)

  const onClickAddr = () => {
    new window.daum.Postcode({
      oncomplete(addrData: IAddr) {
        const geocoder = new window.kakao.maps.services.Geocoder()

        geocoder.addressSearch(addrData.address, (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const currentPos = new window.kakao.maps.LatLng(result[0].y, result[0].x)

            setAddress({
              value: addrData.address,
              coords: { latitude: currentPos.getLat(), longitude: currentPos.getLng() },
            })
            map?.panTo(currentPos)
            setMap(map)
            setMarkers({ lat: currentPos.getLat(), lng: currentPos.getLng() })
          }
        })
      },
    }).open()
  }

  // useEffect(() => {
  //   console.log('address:', address)
  //   if (window.kakao && window.kakao.maps && map) {
  //     const currentPos = new window.kakao.maps.LatLng(address.coords?.latitude!, address.coords?.longitude!)
  //
  //     map?.panTo(currentPos)
  //     setMap(map)
  //     setMarkers({ lat: address.coords?.latitude || null, lng: address.coords?.longitude || null })
  //   }
  // }, [map])

  return (
    <div>
      <div role={'presentation'} onClick={onClickAddr} className={'space-y-6'}>
        <div className={'mx-10'}>
          <InputField
            id={'addr'}
            readOnly
            value={address.value}
            type={'text'}
            placeholder={'예) 종로 3가'}
            className={
              '!left-12 !m-auto !w-64 flex-1 !rounded-[10px] !px-0 placeholder:text-sm placeholder:text-gray-300'
            }
            icon={<CiSearch className='absolute right-4 cursor-pointer text-2xl text-[#222]' />}
          />
        </div>
        <div>
          <Map
            center={{ lat: userLocal.latitude, lng: userLocal.longitude }}
            zoomable
            level={3}
            style={{
              width: '100%',
              height: '250px',
              borderRadius: '8px',
            }}
            onCreate={setMap}>
            <div key={`${markers?.lat}_${markers?.lng}`}>
              <MapMarker
                position={{ lat: markers?.lat!, lng: markers?.lng! }}
                image={{
                  src: 'https://naejango.s3.ap-northeast-2.amazonaws.com/images/place_marker.svg',
                  size: {
                    width: 30,
                    height: 30,
                  },
                }}
              />
            </div>
          </Map>
          <div />
        </div>
      </div>
    </div>
  )
}
export default SearchAddress
