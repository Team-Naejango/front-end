import React from 'react'
import { CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk'

import SelectModal from '@/app/(main)/trades/SelectModal'

interface EventProps {
  position: { lat: number; lng: number }
  onClick: () => void
  hasModal: boolean
}

const PlaceMarker = ({ position, onClick, hasModal }: EventProps) => {
  return (
    <>
      <MapMarker
        position={position}
        onClick={onClick}
        zIndex={-1}
        image={{
          src: 'https://naejango.s3.ap-northeast-2.amazonaws.com/images/place_marker.svg',
          size: {
            width: 36,
            height: 36,
          },
        }}
      />
      {hasModal && (
        <CustomOverlayMap position={position}>
          <SelectModal />
        </CustomOverlayMap>
      )}
    </>
  )
}

export default PlaceMarker
