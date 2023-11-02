'use client'

import React, { useCallback, useEffect, useLayoutEffect, Dispatch, SetStateAction } from 'react'
import { Map, CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Controller, useForm } from 'react-hook-form'
import Image from 'next/image'
import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import uuid from 'react-uuid'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import currentArea from '@/app/assets/image/current_area.svg'

import SearchInput from '@/app/components/atom/SearchInput'
import Button from '@/app/components/atom/Button'
import { LocationProps } from '@/app/hooks/useGeolocation'
import { activatedWareHouseTitleState, locationRealState } from '@/app/store/atom'
import { SearchCondition, Storages } from '@/app/apis/types/domain/warehouse/warehouse'
import { PLACE } from '@/app/libs/client/reactQuery/queryKey/place'
import { useCategories } from '@/app/hooks/useCategories'

import { nearbyStorage } from '@/app/apis/domain/place/place'
import { itemSearch, ItemSearchParam } from '@/app/apis/domain/warehouse/warehouse'

/* global kakao, maps, services */
import Status = kakao.maps.services.Status

interface EventProps {
  kakaoMap: kakao.maps.Map | null
  setKakaoMap: Dispatch<SetStateAction<kakao.maps.Map | null>>
  selectedCategory: string
  markers: SearchCondition[] | Storages[]
  setMarkers: Dispatch<SetStateAction<SearchCondition[] | Storages[]>>
  myLocation: LocationProps
  setMyLocation: (value: { coords: { latitude: number; longitude: number } }) => void
  setIsUpdatePreview: Dispatch<SetStateAction<boolean>>
  isDragedMixture: boolean
  setIsDragedMixture: Dispatch<SetStateAction<boolean>>
  info: SearchCondition | Storages | null
  setInfo: Dispatch<SetStateAction<SearchCondition | Storages | null>>
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
  const { findCategoryList } = useCategories()
  const userRealArea = useRecoilValue<{ latitude: number; longitude: number }>(locationRealState)
  const setSelectedTitle = useSetRecoilState<string>(activatedWareHouseTitleState)

  // let isUseBounds = true

  const {
    watch,
    handleSubmit,
    setValue,
    setError,
    control,
    reset,
    formState: { errors },
  } = useForm<FormProps>({
    mode: 'onTouched',
  })
  const search = watch('search')

  // 근처 창고 조회
  const { data: { data: storages } = {}, refetch: refetchStorages } = useQuery(
    [PLACE.조회],
    () =>
      nearbyStorage({
        lat: String(myLocation.coordinates.latitude),
        lon: String(myLocation.coordinates.longitude),
        rad: '1500',
        page: '0',
        size: '30',
      }),
    { enabled: !!kakaoMap }
  )

  const updateMarkers = useCallback(
    (newMarkers: SearchCondition[] | Storages[]) => {
      setMarkers(newMarkers)
    },
    [setMarkers]
  )

  // 근처 창고 검색
  const kakaoMapCallback = useCallback(
    (status: Status) => {
      if (!kakaoMap) return

      if (status === window.kakao.maps.services.Status.OK) {
        setIsUpdatePreview(true)
        const bounds = new window.kakao.maps.LatLngBounds()

        const newMarkers = storages?.result.map(storage => {
          const markers = { ...storage }

          bounds.extend(new window.kakao.maps.LatLng(storage.coord.latitude!, storage.coord.longitude!))
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
    [kakaoMap, storages]
  )

  // 키워드 또는 카테고리로 근처 창고 검색
  const onSearchKeywordOrCategories = useCallback(
    async (keyword: string, category: string) => {
      if (!kakaoMap) return

      setIsUpdatePreview(true)
      const bounds = new window.kakao.maps.LatLngBounds()

      const searchParams: ItemSearchParam = {
        lat: String(myLocation.coordinates.latitude),
        lon: String(myLocation.coordinates.longitude),
        rad: '1500',
        page: '0',
        size: '20',
        keyword,
        categoryId: findCategoryList(category).categoryId!,
      }

      try {
        const { data: items } = await itemSearch(searchParams)

        const newMarkers = items?.result.map(item => {
          const markers = { ...item }

          bounds.extend(new window.kakao.maps.LatLng(item.coord.latitude, item.coord.longitude))
          return markers
        })

        updateMarkers(newMarkers || [])
      } catch (error) {
        console.log('아이템 검색 오류:', error)
      }
    },
    [kakaoMap]
  )

  useEffect(() => {
    if (!kakaoMap) return

    refetchStorages()

    const status = kakao.maps.services.Status.OK
    kakaoMapCallback(status)
  }, [kakaoMap, kakaoMapCallback])

  useLayoutEffect(() => {
    if (search !== '') {
      reset()
    }
  }, [selectedCategory])

  const onSubmitSearch = () => {
    onSearchKeywordOrCategories(search, selectedCategory)
    isDragedMixture && setIsDragedMixture(false)
  }

  // 마커 클릭 시
  const onClickDottedMarker = (event: kakao.maps.Marker, marker: SearchCondition | Storages) => {
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
          <div className={'mb-2 mt-4 flex'}>
            <Controller
              control={control}
              name='search'
              defaultValue=''
              rules={{
                maxLength: 10,
                validate: {
                  limitLength: data => {
                    if (data.length < 2) {
                      return '최소 2글자 이상 입력해주세요.'
                    }
                  },
                },
              }}
              render={({ field }) => (
                <SearchInput
                  type='text'
                  className='!m-0'
                  placeholder='아이템명을 입력해주세요.'
                  {...field}
                  maxLength={10}
                />
              )}
            />
            <Button text={'검색'} type={'submit'} small className={'!mt-0 ml-2 h-[42px] !text-[13px]'} />
          </div>
          {errors.search?.message ? (
            <p className='-mt-4 mb-1 text-[12px] text-red-400'>{errors.search?.message}</p>
          ) : null}
        </form>
      ) : (
        <Skeleton className={'mt-4'} width={330} height={42} baseColor={'rgba(240, 240, 240, 0.5)'} />
      )}

      {myLocation.isLoaded ? (
        <Map
          center={{ lat: 37.49648606, lng: 127.02836155 }}
          zoomable
          level={5}
          style={{
            width: '100%',
            height: '250px',
            borderRadius: '8px',
            position: 'relative',
          }}
          onCreate={setKakaoMap}
          onDragEnd={async map => {
            try {
              const storage = await refetchStorages()

              const markers = storage.data?.data.result.map(value => {
                return {
                  storageId: Number(value.storageId),
                  ownerId: Number(value.ownerId),
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

              isDragedMixture && setIsDragedMixture(false)
              setValue('search', '')
              setError('search', { message: '' })
            } catch (error: unknown) {
              if (error instanceof AxiosError) {
                return Promise.reject(error)
              }
            }
          }}>
          <div
            className={
              'absolute right-4 top-[7.5rem] z-50 rounded-md border border-gray-200 bg-white bg-clip-padding p-1.5 shadow-sm'
            }>
            <button
              onClick={async () => {
                if (kakaoMap) {
                  const bounds = new window.kakao.maps.LatLngBounds()

                  setMyLocation({
                    coords: {
                      latitude: userRealArea.latitude,
                      longitude: userRealArea.longitude,
                    },
                  })

                  const storage = await nearbyStorage({
                    lat: String(userRealArea.latitude),
                    lon: String(userRealArea.longitude),
                    rad: '1500',
                    page: '0',
                    size: '30',
                  })

                  const markers = storage?.data.result.map(value => {
                    const markers = { ...value }

                    bounds.extend(new window.kakao.maps.LatLng(userRealArea.latitude, userRealArea.longitude))
                    return markers
                  })
                  updateMarkers(markers || [])

                  kakaoMap.setLevel(5)
                  kakaoMap.panTo(new window.kakao.maps.LatLng(userRealArea.latitude, userRealArea.longitude))
                }
              }}
              className={'flex h-full items-center justify-center text-xs'}>
              <Image src={currentArea} alt='현재 위치 이미지' width={18} height={18} />
            </button>
          </div>
          {markers?.map(marker => {
            return (
              <div key={uuid()}>
                <MapMarker
                  position={{
                    lat: marker.coord.latitude || myLocation.coordinates.latitude,
                    lng: marker.coord.longitude || myLocation.coordinates.longitude,
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
                      lat: marker.coord.latitude || myLocation.coordinates.latitude,
                      lng: marker.coord.longitude || myLocation.coordinates.longitude,
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
