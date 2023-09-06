'use client'

import React, { useCallback, useEffect, useLayoutEffect, Dispatch, SetStateAction } from 'react'
import { Map, CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Controller, useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import uuid from 'react-uuid'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import SearchInput from '@/app/components/atom/SearchInput'
import Button from '@/app/components/atom/Button'
import useGeolocation, { LocationProps } from '@/app/hooks/useGeolocation'
import { activatedWareHouseTitleState, locationState } from '@/app/store/atom'
import { Storages } from '@/app/apis/types/domain/warehouse/warehouse'
import { PLACE } from '@/app/libs/client/reactQuery/queryKey/place'

import { nearbyStorage } from '@/app/apis/domain/place/place'

/* global kakao, maps, services */
import Status = kakao.maps.services.Status
// import PlacesSearchResult = kakao.maps.services.PlacesSearchResult
// import Pagination = kakao.maps.Pagination
// import PlacesSearchOptions = kakao.maps.services.PlacesSearchOptions
// import PlacesSearchResultItem = kakao.maps.services.PlacesSearchResultItem

interface EventProps {
  kakaoMap: kakao.maps.Map | null
  setKakaoMap: Dispatch<SetStateAction<kakao.maps.Map | null>>
  selectedCategory: string
  markers: Storages[]
  setMarkers: Dispatch<SetStateAction<Storages[]>>
  myLocation: LocationProps
  setMyLocation: (value: { coords: { latitude: number; longitude: number } }) => void
  setIsUpdatePreview: Dispatch<SetStateAction<boolean>>
  isDragedMixture: boolean
  setIsDragedMixture: Dispatch<SetStateAction<boolean>>
  info: Storages | null
  setInfo: Dispatch<SetStateAction<Storages | null>>
}

interface FormProps {
  search: string
}

const PlaceMarker = ({
  kakaoMap,
  setKakaoMap,
  selectedCategory,
  myLocation,
  setMyLocation,
  setIsUpdatePreview,
  markers,
  setMarkers,
  isDragedMixture,
  setIsDragedMixture,
  info,
  setInfo,
}: EventProps) => {
  const { getUserAddress } = useGeolocation()
  const userArea = useRecoilValue<{ latitude: number; longitude: number }>(locationState)
  const setSelectedTitle = useSetRecoilState<string>(activatedWareHouseTitleState)

  // let isUseBounds = true

  const { watch, handleSubmit, control, reset } = useForm<FormProps>({
    mode: 'onTouched',
  })

  // 근처 창고 조회
  const { data: { data: storage } = {}, refetch } = useQuery(
    [PLACE.조회],
    () =>
      nearbyStorage({
        lat: String(userArea.latitude),
        lon: String(userArea.longitude),
        rad: '1000',
        page: '0',
        size: '10',
      }),
    { enabled: !!kakaoMap }
  )

  const updateMarkers = useCallback(
    (newMarkers: Storages[]) => {
      setMarkers(newMarkers)
    },
    [setMarkers]
  )

  // 근처 창고 카카오 지도 검색
  const kakaoMapCallback = useCallback(
    (status: Status) => {
      if (!kakaoMap) return

      if (status === window.kakao.maps.services.Status.OK) {
        setIsUpdatePreview(true)
        const bounds = new window.kakao.maps.LatLngBounds()

        getUserAddress()

        const newMarkers = storage?.searchResult.map(value => {
          const markers = {
            id: Number(value.storageId),
            address: value.address,
            description: value.description,
            imgUrl: value.imgUrl,
            coord: {
              latitude: value.coord.latitude,
              longitude: value.coord.longitude,
            },
            name: value.name,
            distance: value.distance,
          }

          bounds.extend(new window.kakao.maps.LatLng(Number(value.coord.latitude), Number(value.coord.longitude)))
          return markers
        })
        updateMarkers(newMarkers || [])

        // if (isUseBounds) kakaoMap && kakaoMap.setBounds(bounds)
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        setIsUpdatePreview(false)
        updateMarkers([])
        console.log('데이터 없음')
      } else if (status === kakao.maps.services.Status.ERROR) {
        setIsUpdatePreview(false)
        updateMarkers([])
        console.log('원인불명 에러')
      }
    },
    [kakaoMap, storage]
  )
  // 키워드 카카오 지도 검색
  // const keywordSearch = useCallback(
  //   (type: string | undefined, query?: string) => {
  //     if (!kakaoMap) return
  //     const places = new window.kakao.maps.services.Places()
  //
  //     const options: PlacesSearchOptions = {
  //       // category_group_code: '',
  //       location: new window.kakao.maps.LatLng(kakaoMap.getCenter().getLat(), kakaoMap.getCenter().getLng()),
  //       sort: kakao.maps.services.SortBy.ACCURACY,
  //       radius: 1000,
  //     }
  //
  //     if (type) {
  //       isUseBounds = false
  //       places.keywordSearch(type, kakaoMapCallback, { ...options, ...{ query: type } })
  //     } else if (query) {
  //       isUseBounds = false
  //       places.keywordSearch(query, kakaoMapCallback, { ...options, ...{ query } })
  //     }
  //   },
  //   [kakaoMap]
  // )

  // useEffect(() => {
  //   keywordSearch(watch('search'), selectedCategory)
  // }, [selectedCategory, kakaoMap, updateMarkers, position, keywordSearch, watch])

  useEffect(() => {
    if (!kakaoMap) return

    const status = kakao.maps.services.Status.OK
    kakaoMapCallback(status)
  }, [kakaoMap, kakaoMapCallback])

  useLayoutEffect(() => {
    if (watch('search') !== '') reset()
  }, [selectedCategory])

  const onSubmitSearch = () => {
    // keywordSearch(watch('search'))
    isDragedMixture && setIsDragedMixture(false)
  }

  const onKeyDownSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // if (event.key === 'Enter') keywordSearch(event.currentTarget.value)
  }

  // 마커 클릭 시
  const onClickDottedMarker = (event: kakao.maps.Marker, marker: Storages) => {
    if (!kakaoMap) return

    setInfo(marker)
    kakaoMap.setLevel(5)
    kakaoMap.panTo(event.getPosition())
    setIsDragedMixture(true)
    setSelectedTitle(marker.name)
  }

  return (
    <>
      {myLocation.isLoaded ? (
        <form onSubmit={handleSubmit(onSubmitSearch)}>
          <div className={'mt-4 flex'}>
            <Controller
              control={control}
              name='search'
              defaultValue=''
              render={({ field }) => (
                <SearchInput
                  type='text'
                  className='!m-0'
                  placeholder='아이템명을 입력해주세요.'
                  onKeyDown={onKeyDownSearch}
                  {...field}
                />
              )}
            />
            <Button text={'검색'} type={'submit'} small className={'!mt-0 ml-2 h-[42px] !text-[13px]'} />
          </div>
        </form>
      ) : (
        <Skeleton className={'mt-4'} width={330} height={42} baseColor={'rgba(240, 240, 240, 0.5)'} />
      )}

      {myLocation.isLoaded ? (
        <Map
          center={{ lat: userArea.latitude, lng: userArea.longitude }}
          zoomable
          level={5}
          style={{
            width: '100%',
            height: '250px',
            borderRadius: '8px',
          }}
          onCreate={setKakaoMap}
          // onBoundsChanged={async () => {
          //   await refetch()
          // }}
          onDragEnd={async map => {
            const storage = await refetch()
            const markers = storage.data?.data.searchResult.map(value => {
              return {
                id: Number(value.storageId),
                address: value.address,
                description: value.description,
                imgUrl: value.imgUrl,
                coord: {
                  latitude: value.coord.latitude,
                  longitude: value.coord.longitude,
                },
                name: value.name,
                distance: value.distance,
              }
            })
            updateMarkers(markers || [])
            setMyLocation({
              coords: {
                latitude: map.getCenter().getLat(),
                longitude: map.getCenter().getLng(),
              },
            })
            // setIsDragedMixture(true)
            isDragedMixture && setIsDragedMixture(false)
          }}>
          {markers?.map(marker => {
            // console.log('marker:', marker)
            return (
              <div key={uuid()}>
                <MapMarker
                  position={{
                    lat: marker.coord.latitude || userArea.latitude,
                    lng: marker.coord.longitude || userArea.longitude,
                  }}
                  image={{
                    src: 'https://naejango.s3.ap-northeast-2.amazonaws.com/images/place_marker.svg',
                    size: {
                      width: 30,
                      height: 30,
                    },
                  }}
                  onClick={event => onClickDottedMarker(event, marker)}
                />

                {info && info.name === marker.name && (
                  <CustomOverlayMap
                    position={{
                      lat: marker.coord.latitude || userArea.latitude,
                      lng: marker.coord.longitude || userArea.longitude,
                    }}
                    yAnchor={2.1}>
                    <div>
                      <span className={'rounded border border-[#222] p-1 text-[13px] font-normal'}>{marker.name}</span>
                    </div>
                  </CustomOverlayMap>
                )}
              </div>
            )
          })}
        </Map>
      ) : (
        <Skeleton width={330} height={250} className={'mt-4'} baseColor={'rgba(240, 240, 240, 0.5)'} />
      )}
    </>
  )
}

export default PlaceMarker
