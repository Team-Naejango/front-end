'use client'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { useRecoilValue } from 'recoil'
import { CiSearch } from 'react-icons/ci'

import InputField from '@/app/components/atom/InputField'
import { locationState } from '@/app/store/atom'

/* global daum */
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
  coords: {
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
  const [map, setMap] = useState<any>()
  const [markers, setMarkers] = useState<any>()
  const userLocal = useRecoilValue(locationState)

  console.log('userLocal:', userLocal)

  // 2) 검색된 주소 위치 표시
  const onClickAddr = () => {
    // 3) 주소 검색
    new window.daum.Postcode({
      // 4) 검색된 주소 클릭 시 콜백 함수
      oncomplete(addrData: IAddr) {
        const geocoder = new window.kakao.maps.services.Geocoder()

        geocoder.addressSearch(
          addrData.address, // 검색된 주소
          (result: any, status: any) => {
            // 5) 성공시 좌표 값을 가져온다.
            if (status === window.kakao.maps.services.Status.OK) {
              const currentPos = new window.kakao.maps.LatLng(result[0].y, result[0].x)

              setAddress({
                value: addrData.address,
                coords: { latitude: currentPos.getLat(), longitude: currentPos.getLng() },
              })
              map.panTo(currentPos)
              setMap(map)

              // 결과값으로 받은 위치를 마커로 표시합니다
              // markers.setMap(null)
              setMarkers({ position: { lat: currentPos.getLat(), lng: currentPos.getLng() } })
            }
          }
        )
      },
    }).open()
  }

  return (
    <div>
      <div role={'presentation'} onClick={onClickAddr} className={'space-y-6'}>
        <div className={'mx-10'}>
          <InputField
            id={'addr'}
            readOnly
            value={address.value}
            type={'text'}
            placeholder={'예) 종로3가'}
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
            <div key={`${markers?.position.lat}_${markers?.position.lng}`}>
              <MapMarker
                position={{ lat: markers?.position.lat!, lng: markers?.position.lng! }}
                image={{
                  src: 'https://naejango.s3.ap-northeast-2.amazonaws.com/images/place_marker.svg',
                  size: {
                    width: 30,
                    height: 30,
                  },
                }}
                // onClick={event => setMarkers(event)}
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
