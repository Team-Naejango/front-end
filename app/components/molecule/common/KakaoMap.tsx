'use client'

import React, { useState, useMemo } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import useGeolocation from '@/app/hooks/useGeolocation'
import PlaceMarker from '@/app/(home)/(main)/places/PlaceMarker'
import Categories from '@/app/(home)/(main)/places/Categories'
import PreviewCard from '@/app/(home)/(main)/places/PreviewCard'
import { positions, PositionType } from '@/app/(home)/(main)/places/dummyData'

export const categoriesData: string[] = ['전체', '식품', '가전/가구', '의류/뷰티', '건강/생활']

const KakaoMap = () => {
  const { myLocation, setMyLocation } = useGeolocation()
  const [markers, setMarkers] = useState<PositionType[] | []>([])
  const [selectedCategory, setSelectedCategory] = useState<string>(() => categoriesData[0])
  const [isUpdatePreview, setIsUpdatePreview] = useState<boolean>(true)

  console.log('myLocation:', myLocation)

  const getPosition = useMemo(() => {
    return { lat: myLocation.coordinates.latitude, lng: myLocation.coordinates.longitude }
  }, [myLocation.coordinates.latitude, myLocation.coordinates.longitude])

  return (
    <>
      {myLocation.isLoaded ? (
        <Categories
          categoriesData={categoriesData}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      ) : (
        <Skeleton className={'mt-8'} width={330} height={30} baseColor={'rgba(240, 240, 240, 0.5)'} />
      )}
      <PlaceMarker
        position={getPosition}
        myLocation={myLocation}
        setMyLocation={setMyLocation}
        markers={markers}
        setMarkers={setMarkers}
        selectedCategory={selectedCategory}
        setIsUpdatePreview={setIsUpdatePreview}
      />

      {myLocation.isLoaded ? (
        isUpdatePreview ? (
          <PreviewCard previews={markers || []} />
        ) : (
          <div className={'mt-4 flex h-[190px] items-center justify-center rounded border'}>
            <p className={'text-[13px]'}>범위에 존재하는 창고가 없습니다.</p>
          </div>
        )
      ) : (
        <Skeleton width={330} height={200} className={'mt-[1.125rem]'} baseColor={'rgba(240, 240, 240, 0.5)'} />
      )}
    </>
  )
}

export default KakaoMap
