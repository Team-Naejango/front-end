import { Dispatch, SetStateAction } from 'react'

import { PositionType } from '@/app/(home)/(main)/places/dummyData'

/* global kakao, maps, services */
import PlacesSearchResult = kakao.maps.services.PlacesSearchResult
import Status = kakao.maps.services.Status
import Pagination = kakao.maps.Pagination

type SearchCallbackProps = {
  map: any
  setMarkers: Dispatch<SetStateAction<PositionType[]>>
  setIsUpdatePreview: Dispatch<SetStateAction<boolean>>
}

export const useSearchResultCallback = ({ map, setMarkers, setIsUpdatePreview }: SearchCallbackProps) => {
  const kakaoMapCallback = (data: PlacesSearchResult, status: Status, _pagination: Pagination) => {
    if (status === window.kakao.maps.services.Status.OK) {
      setIsUpdatePreview(true)

      const bounds = new window.kakao.maps.LatLngBounds()

      let markers: PositionType[] = []
      // getPlace(data)
      for (let i = 0; i < data.length; i++) {
        markers.push({
          position: {
            lat: Number(data[i].y),
            lng: Number(data[i].x),
          },
          content: data[i].place_name,
          // data: data[i],
        })
        bounds.extend(new window.kakao.maps.LatLng(Number(data[i].y), Number(data[i].x)))
      }
      setMarkers(markers)
      // if (isUseBounds) map.setBounds(bounds);
      map.setBounds(bounds)
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      setIsUpdatePreview(false)
      setMarkers([])
    } else if (status === kakao.maps.services.Status.ERROR) {
      // setIsUpdateView(true)
      // setMarkers([])
    }
  }

  return { kakaoMapCallback }
}
