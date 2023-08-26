'use client'

import React, { useState, useCallback, useEffect, useLayoutEffect, Dispatch, SetStateAction } from 'react'
import { Map, CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk'
import { useSetRecoilState } from 'recoil'
import { Controller, useForm } from 'react-hook-form'
import uuid from 'react-uuid'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import SearchInput from '@/app/components/atom/SearchInput'
import Button from '@/app/components/atom/Button'
import { PositionType } from '@/app/(routes)/(home)/(main)/places/dummyData'
import { LocationProps } from '@/app/hooks/useGeolocation'
import { activatedWareHouseTitleState } from '@/app/store/atom'

/* global kakao, maps, services */
import PlacesSearchResult = kakao.maps.services.PlacesSearchResult
import Status = kakao.maps.services.Status
import Pagination = kakao.maps.Pagination
import PlacesSearchOptions = kakao.maps.services.PlacesSearchOptions

interface EventProps {
  position: { lat: number; lng: number }
  selectedCategory: string
  markers: PositionType[]
  setMarkers: Dispatch<SetStateAction<PositionType[]>>
  myLocation: LocationProps
  setMyLocation: (value: { coords: { latitude: number; longitude: number } }) => void
  setIsUpdatePreview: Dispatch<SetStateAction<boolean>>
  isDragedMixture: boolean
  setIsDragedMixture: Dispatch<SetStateAction<boolean>>
  info: PositionType | null
  setInfo: Dispatch<SetStateAction<PositionType | null>>
}

interface FormProps {
  search: string
}

const PlaceMarker = ({
  position,
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
  const [kakaoMap, setKakaoMap] = useState<kakao.maps.Map | null>(null)
  const setWareHouseTitleValue = useSetRecoilState<string>(activatedWareHouseTitleState)

  const { watch, handleSubmit, control, reset } = useForm<FormProps>()

  const updateMarkers = useCallback(
    (newMarkers: PositionType[]) => {
      setMarkers(newMarkers)
    },
    [setMarkers]
  )

  let isUseBounds = true
  const kakaoMapCallback = (data: PlacesSearchResult, status: Status, _pagination: Pagination) => {
    if (status === window.kakao.maps.services.Status.OK) {
      setIsUpdatePreview(true)
      const bounds = new window.kakao.maps.LatLngBounds()

      let markers: PositionType[] = []

      for (let i = 0; i < data.length; i++) {
        markers.push({
          position: {
            lat: Number(data[i].y),
            lng: Number(data[i].x),
          },
          content: data[i].place_name,
          data: data[i],
        })
        bounds.extend(new window.kakao.maps.LatLng(Number(data[i].y), Number(data[i].x)))
      }
      updateMarkers(markers)

      if (isUseBounds) kakaoMap && kakaoMap.setBounds(bounds)
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      setIsUpdatePreview(false)
      updateMarkers([])
      console.log('데이터 없음')
    } else if (status === kakao.maps.services.Status.ERROR) {
      setIsUpdatePreview(false)
      updateMarkers([])
      console.log('원인불명 에러')
    }
  }

  const keywordSearch = useCallback(
    (type: string | undefined, query?: string) => {
      if (!kakaoMap) return
      const places = new window.kakao.maps.services.Places()

      const options: PlacesSearchOptions = {
        // category_group_code: '',
        location: new window.kakao.maps.LatLng(kakaoMap.getCenter().getLat(), kakaoMap.getCenter().getLng()),
        sort: kakao.maps.services.SortBy.ACCURACY,
        radius: 1000,
      }

      if (type) {
        isUseBounds = false
        places.keywordSearch(type, kakaoMapCallback, { ...options, ...{ query: type } })
      } else if (query) {
        isUseBounds = false
        places.keywordSearch(query, kakaoMapCallback, { ...options, ...{ query } })
      }
    },
    [kakaoMap]
  )

  useEffect(() => {
    keywordSearch(watch('search'), selectedCategory)
  }, [selectedCategory, kakaoMap, updateMarkers, position, keywordSearch, watch])

  useLayoutEffect(() => {
    if (watch('search') !== '') {
      reset()
    }
  }, [selectedCategory])

  const onSubmitSearch = () => {
    keywordSearch(watch('search'))
    isDragedMixture && setIsDragedMixture(false)
  }

  const onKeyDownSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') keywordSearch(event.currentTarget.value)
  }

  const onClickDottedMarker = (event: kakao.maps.Marker, marker: PositionType) => {
    setInfo(marker)
    kakaoMap && kakaoMap.panTo(event.getPosition())
    setIsDragedMixture(true)
    setWareHouseTitleValue(marker.content)
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
          center={{ lat: position.lat, lng: position.lng }}
          zoomable
          level={5}
          style={{
            width: '100%',
            height: '250px',
            borderRadius: '8px',
          }}
          onCreate={setKakaoMap}
          onDragEnd={map => {
            setInfo({ content: '', position: { lat: 0, lng: 0 }, data: '' })
            setMyLocation({
              coords: {
                latitude: map.getCenter().getLat(),
                longitude: map.getCenter().getLng(),
              },
            })
            isDragedMixture && setIsDragedMixture(false)
          }}>
          {markers?.map(marker => {
            // console.log('marker:', marker)
            return (
              <div key={uuid()}>
                <MapMarker
                  position={{ lat: marker.position.lat, lng: marker.position.lng }}
                  image={{
                    src: 'https://naejango.s3.ap-northeast-2.amazonaws.com/images/place_marker.svg',
                    size: {
                      width: 30,
                      height: 30,
                    },
                  }}
                  onClick={event => onClickDottedMarker(event, marker)}
                />

                {info && info.content === marker.content && (
                  <CustomOverlayMap position={{ lat: marker.position.lat, lng: marker.position.lng }} yAnchor={2.1}>
                    <div>
                      <span className={'rounded border border-[#222] p-1 text-[13px] font-normal'}>
                        {marker.content}
                      </span>
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
