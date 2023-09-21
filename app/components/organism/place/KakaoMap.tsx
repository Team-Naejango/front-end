'use client'

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import useGeolocation from '@/app/hooks/useGeolocation'
import PlaceMarker from '@/app/components/molecule/kakaomap/PlaceMarker'
import Categories from '@/app/components/molecule/kakaomap/Categories'
import PreviewCard from '@/app/components/molecule/kakaomap/PreviewCard'
import { CATEGORIES } from '@/app/libs/client/constants/static'
import { SearchCondition, Storages } from '@/app/apis/types/domain/warehouse/warehouse'
import { ITEM } from '@/app/libs/client/reactQuery/queryKey/warehouse'

import { storageItem } from '@/app/apis/domain/warehouse/warehouse'

/* global kakao, maps */

const KakaoMap = () => {
  const { myLocation, setMyLocation } = useGeolocation()
  const [kakaoMap, setKakaoMap] = useState<kakao.maps.Map | null>(null)
  const [markers, setMarkers] = useState<SearchCondition[] | Storages[] | []>([])
  const [info, setInfo] = useState<SearchCondition | Storages | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<{ name: string }>(() => CATEGORIES[0])
  const [isUpdatePreview, setIsUpdatePreview] = useState<boolean>(true)
  const [isDragedMixture, setIsDragedMixture] = useState<boolean>(false)

  console.log('info:', info)

  // 창고 아이템 조회
  const { data: { data: _itemInfo } = {} } = useQuery(
    [ITEM.조회, info],
    () =>
      storageItem({
        storageId: String(info?.storageId),
        status: true,
        page: '0',
        size: '10',
      }),
    {
      enabled: !!info,
    }
  )

  return (
    <>
      {myLocation.isLoaded ? (
        <Categories
          categoriesData={CATEGORIES}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      ) : (
        <Skeleton className={'mt-2'} width={330} height={30} baseColor={'rgba(240, 240, 240, 0.5)'} />
      )}

      <PlaceMarker
        kakaoMap={kakaoMap}
        setKakaoMap={setKakaoMap}
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
          <PreviewCard
            previews={markers}
            dragedPreviews={_itemInfo?.result || []}
            activedItem={info?.name ?? ''}
            kakaoMap={kakaoMap}
            isDragedMixture={isDragedMixture}
            info={info}
            setInfo={setInfo}
            setIsDragedMixture={setIsDragedMixture}
          />
        ) : (
          <div className={'flex h-[190px] items-center justify-center rounded border'}>
            <p className={'text-[13px]'}>범위에 존재하는 창고가 없습니다.</p>
          </div>
        )
      ) : (
        <Skeleton width={330} height={190} className={'mt-5'} baseColor={'rgba(240, 240, 240, 0.5)'} />
      )}
    </>
  )
}

export default KakaoMap
