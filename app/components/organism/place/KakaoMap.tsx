'use client'

import React, { useState, useMemo } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import useGeolocation from '@/app/hooks/useGeolocation'
import PlaceMarker from '@/app/components/molecule/kakaomap/PlaceMarker'
import Categories from '@/app/components/molecule/kakaomap/Categories'
import PreviewCard from '@/app/components/molecule/kakaomap/PreviewCard'
import { positions, PositionType } from '@/app/(home)/(main)/places/dummyData'
import { CATEGORIES } from '@/app/libs/client/constants/warehouse'

const KakaoMap = () => {
  // todo: markers, info 유사 데이터 바인딩으로 인한 리팩토링 필요
  const { myLocation, setMyLocation } = useGeolocation()
  const [markers, setMarkers] = useState<PositionType[] | []>([])
  const [info, setInfo] = useState<PositionType | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<{ name: string }>(() => CATEGORIES[0])
  const [isUpdatePreview, setIsUpdatePreview] = useState<boolean>(true)
  const [isDragedMixture, setIsDragedMixture] = useState<boolean>(false)

  const getPosition = useMemo(() => {
    return { lat: myLocation.coordinates.latitude, lng: myLocation.coordinates.longitude }
  }, [myLocation.coordinates.latitude, myLocation.coordinates.longitude])

  return (
    <>
      {myLocation.isLoaded ? (
        <Categories
          categoriesData={CATEGORIES}
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
        selectedCategory={selectedCategory.name}
        setIsUpdatePreview={setIsUpdatePreview}
        isDragedMixture={isDragedMixture}
        setIsDragedMixture={setIsDragedMixture}
        info={info}
        setInfo={setInfo}
      />

      {myLocation.isLoaded ? (
        isUpdatePreview ? (
          // todo: 임시 더미데이터, api 받은 후 리팩토링
          <PreviewCard
            previews={isDragedMixture ? positions : markers}
            activedItem={info?.content ?? ''}
            isDragedMixture={isDragedMixture}
          />
        ) : (
          <div className={'mt-4 flex h-[190px] items-center justify-center rounded border'}>
            <p className={'text-[13px]'}>범위에 존재하는 창고가 없습니다.</p>
          </div>
        )
      ) : (
        <Skeleton width={330} height={190} className={'mt-[1.125rem]'} baseColor={'rgba(240, 240, 240, 0.5)'} />
      )}
    </>
  )
}

export default KakaoMap
