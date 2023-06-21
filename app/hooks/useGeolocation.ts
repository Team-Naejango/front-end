'use client'

import { useState, useEffect } from 'react'

interface LocationTypes {
  isLoaded: boolean
  coordinates: { latitude: number; longitude: number }
  error?: { code: number; message: string }
}

const useGeolocation = () => {
  const [myLocation, setMyLocation] = useState<LocationTypes>({
    isLoaded: false,
    coordinates: { latitude: 0, longitude: 0 },
  })

  const coordOnSuccess = (position: { coords: { latitude: number; longitude: number } }) => {
    setMyLocation({
      isLoaded: true,
      coordinates: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
    })
  }

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
    if (!('geolocation' in navigator)) {
      coordOnError({
        code: 404,
        message: '알 수 없는 에러로 인해 위치 데이터를 사용할 수 없습니다.',
      })
    }

    console.log('navigator.geolocation:', navigator.geolocation)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(coordOnSuccess, coordOnError)
    }
  }, [])

  return myLocation
}

export default useGeolocation
