'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRecoilState } from 'recoil'

import { locationState } from '@/app/store/atom'

export interface LocationProps {
  isLoaded: boolean
  coordinates: { latitude: number; longitude: number }
  error?: { code: number; message: string }
}

const useGeolocation = () => {
  const [userArea, setUserArea] = useRecoilState<{ address?: string; latitude: number; longitude: number }>(
    locationState
  )
  const [myLocation, setMyLocation] = useState<LocationProps>({
    isLoaded: false,
    coordinates: { latitude: userArea.latitude, longitude: userArea.longitude },
  })

  const getUserAddress = () => {
    if (typeof window === 'undefined') return
    if (!window.kakao.maps.services.Geocoder) return
    if (!window.kakao.maps.LatLng) return

    const geocoder = new window.kakao.maps.services.Geocoder()
    const currentPos = new window.kakao.maps.LatLng(userArea.latitude, userArea.longitude)

    geocoder.coord2Address(currentPos.getLng(), currentPos.getLat(), (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const { address } = result[0]

        console.log('도로명 주소:', address)
        setUserArea({
          address: address.address_name,
          latitude: userArea.latitude,
          longitude: userArea.longitude,
        })
        console.log('return:', userArea)
      }
      console.error('도로명 주소를 가져오지 못했습니다.')
    })
  }

  const coordOnSuccess = useCallback(
    (position: { coords: { latitude: number; longitude: number } }) => {
      setMyLocation(prevLocation => ({
        ...prevLocation,
        isLoaded: true,
        coordinates: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      }))
      setUserArea({ latitude: position.coords.latitude, longitude: position.coords.longitude })
    },
    [setMyLocation]
  )

  const coordOnError = (error: { code: number; message: string }) => {
    setMyLocation({
      isLoaded: true,
      error,
      coordinates: {
        latitude: userArea.latitude,
        longitude: userArea.longitude,
      },
    })
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      coordOnError({
        code: 404,
        message: '알 수 없는 에러로 인해 위치 데이터를 사용할 수 없습니다.',
      })
    }
    navigator.geolocation.getCurrentPosition(coordOnSuccess, coordOnError)
  }, [])

  return { myLocation, setMyLocation: coordOnSuccess, getUserAddress }
}

export default useGeolocation
