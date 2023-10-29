'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useRouter } from 'next/navigation'

import { locationRealState, locationState } from '@/app/store/atom'
import { COMMON_STORE_KEY } from '@/app/libs/client/constants/store/common'

export interface LocationProps {
  isLoaded: boolean
  coordinates: { latitude: number; longitude: number }
  error?: { code: number; message: string }
}

const useGeolocation = () => {
  const router = useRouter()
  const [userArea, setUserArea] = useRecoilState<{ latitude: number; longitude: number }>(locationState)
  const setUserRealArea = useSetRecoilState<{ latitude: number; longitude: number }>(locationRealState)
  const [myLocation, setMyLocation] = useState<LocationProps>({
    isLoaded: false,
    coordinates: { latitude: userArea.latitude, longitude: userArea.longitude },
  })

  // 유저 현재 주소
  const getUserAddress = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
    const geocoder = new window.kakao.maps.services.Geocoder()
    const currentPos = new window.kakao.maps.LatLng(latitude, longitude)

    geocoder.coord2Address(currentPos.getLng(), currentPos.getLat(), (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const { address } = result[0]
        localStorage.setItem(COMMON_STORE_KEY.주소, address.address_name)
      } else {
        console.error('도로명 주소를 가져오지 못했습니다.')
      }
    })
  }

  // 성공 콜백
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
      setUserArea({ latitude: 37.49648606, longitude: 127.02836155 })
    },
    [setMyLocation]
  )

  // 실패 콜백
  const coordOnError = (error: { code: number; message: string }) => {
    setMyLocation({
      isLoaded: true,
      error,
      coordinates: {
        latitude: userArea.latitude,
        longitude: userArea.longitude,
      },
    })
    router.push('/places')
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      coordOnError({
        code: 404,
        message: '알 수 없는 에러로 인해 위치 데이터를 사용할 수 없습니다.',
      })
    }

    // 취업할 동안만 강남역으로 고정
    setMyLocation({
      isLoaded: true,
      coordinates: {
        latitude: 37.49648606,
        longitude: 127.02836155,
      },
    })
    navigator.geolocation.getCurrentPosition((position: { coords: { latitude: number; longitude: number } }) => {
      setUserRealArea({ latitude: position.coords.latitude, longitude: position.coords.longitude })
      getUserAddress({ latitude: position.coords.latitude, longitude: position.coords.longitude })
    }, coordOnError)
  }, [])

  return { myLocation, setMyLocation: coordOnSuccess, getUserAddress }
}

export default useGeolocation
