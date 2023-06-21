'use client'

import React, { useEffect, useRef, Suspense, lazy } from 'react'

import useGeolocation from '@/app/hooks/useGeolocation'
import Loading from '@/app/loading'

import { Map } from 'react-kakao-maps-sdk'
// const Map = lazy(() => import('react-kakao-maps-sdk').then(module => ({ default: module.Map })))

const KakaoMap = () => {
  const myLocation = useGeolocation()
  const mapRef = useRef<HTMLElement | null>(null)

  console.log('myLocation:', myLocation)
  console.log('mapRef:', mapRef)

  // const initMap = () => {
  //   mapRef.current = document.getElementById('map')
  //   const mapOption = {
  //     center: new window.kakao.maps.LatLng(myLocation.coordinates.latitude, myLocation.coordinates.longitude),
  //     level: 4,
  //   }
  //   return new window.kakao.maps.Map(mapRef.current as HTMLElement, mapOption)
  // }
  //

  // const initMap = () => {
  //   const x = document.getElementById('map')
  //   const map = new window.kakao.maps.Map(x as HTMLElement, {
  //     center: new window.kakao.maps.LatLng(myLocation.coordinates.latitude, myLocation.coordinates.longitude),
  //     level: 4,
  //   })
  //   return map.relayout()
  // }

  // useEffect(() => {
  //   window.kakao.maps.load(() => initMap())
  // }, [initMap])

  return (
    <Suspense fallback={<Loading />}>
      <Map
        center={{ lat: myLocation.coordinates.latitude, lng: myLocation.coordinates.longitude }}
        zoomable
        style={{
          width: '375px',
          height: '620px',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          marginTop: '30px',
        }}
      />
    </Suspense>
    // <div
    //   id='map'
    //   style={{
    //     width: '375px',
    //     height: '620px',
    //     position: 'absolute',
    //     left: '50%',
    //     top: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     marginTop: '30px',
    //   }}>
    //   {myLocation ? null : <Loading />}
    // </div>
  )
}

export default KakaoMap
