'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSetRecoilState } from 'recoil'

import { locationState } from '@/app/store/atom'

export interface LocationProps {
  isLoaded: boolean
  coordinates: { latitude: number; longitude: number }
  error?: { code: number; message: string }
}

const useGeolocation = () => {
  const [myLocation, setMyLocation] = useState<LocationProps>({
    isLoaded: false,
    coordinates: { latitude: 0, longitude: 0 },
  })
  const userLocal = useSetRecoilState(locationState)

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
      userLocal({ latitude: position.coords.latitude, longitude: position.coords.longitude })
    },
    [setMyLocation]
  )

  const coordOnError = (error: { code: number; message: string }) => {
    setMyLocation({
      isLoaded: true,
      error,
      coordinates: {
        latitude: 37.4979517,
        longitude: 127.0276188,
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
    console.log('navigator.geolocation:', navigator.geolocation)
    navigator.geolocation.getCurrentPosition(coordOnSuccess, coordOnError)
  }, [])

  return { myLocation, setMyLocation: coordOnSuccess }
}

export default useGeolocation
