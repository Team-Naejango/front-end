import React from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

import useGeolocation from '@/app/hooks/useGeolocation'
import PlaceMarker from '@/app/(main)/trades/PlaceMarker'
import { positions } from '@/app/(main)/trades/dummyData'

interface EventProps {
  onClick: () => void
  hasModal: boolean
}

const KakaoMap = ({ onClick, hasModal }: EventProps) => {
  const myLocation = useGeolocation()
  console.log('myLocation:', myLocation)

  return (
    // <Suspense fallback={<Loading />}>
    <Map
      center={{ lat: myLocation.coordinates.latitude, lng: myLocation.coordinates.longitude }}
      zoomable
      level={9}
      style={{
        width: '375px',
        height: '620px',
        position: 'fixed',
        marginTop: '30px',
      }}>
      {/* todo: EventMaker 컴포넌트 사용해서 map으로 등록된 위치 뿌리기 */}
      {positions.map((position, index) => {
        return (
          <PlaceMarker
            key={position.id}
            position={{ lat: position.latlng.lat, lng: position.latlng.lng }}
            onClick={onClick}
            hasModal={hasModal}
          />
        )
      })}
    </Map>
    // </Suspense>
  )
}

export default KakaoMap
