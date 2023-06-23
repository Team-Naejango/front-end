import React, { Suspense } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

import useGeolocation from '@/app/hooks/useGeolocation'
import PlaceMarker from '@/app/(home)/(main)/trades/PlaceMarker'
import { positions } from '@/app/(home)/(main)/trades/dummyData'
import Loading from '@/app/loading'
import { OpenModalProps, useModal } from '@/app/hooks/useModal'

interface EventProps {
  onClick: () => void
}

const KakaoMap = () => {
  const myLocation = useGeolocation()
  // todo: 고유 id값 부여하기
  const { modalState, openModal } = useModal()
  console.log('myLocation:', myLocation)

  const onClickModal = (props: OpenModalProps) => {
    openModal({
      title: props.title,
      content: props.content,
      callback: () => {},
    })
  }

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
      {/* todo: 로딩과 렌더링 속도 최적화하기 */}
      {!myLocation.isLoaded ? (
        <Loading />
      ) : (
        positions.map(position => {
          return (
            <PlaceMarker
              key={position.id}
              position={{ lat: position.latlng.latitude, lng: position.latlng.longitude }}
              onClick={() => onClickModal({ title: position.title, content: position.location })}
            />
          )
        })
      )}
    </Map>
    // </Suspense>
  )
}

export default KakaoMap
