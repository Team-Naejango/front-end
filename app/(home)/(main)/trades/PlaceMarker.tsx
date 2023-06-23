import React from 'react'
import { CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk'

import SelectModal from '@/app/(home)/(main)/trades/SelectModal'
import { useModal } from '@/app/hooks/useModal'
import CustomDialog from '@/app/components/molecule/modal/CustomDialog'

interface EventProps {
  position: { lat: number; lng: number }
  onClick: () => void
  hasModal?: {
    isOpen: false
    title: ''
    content: ''
  }
}

const PlaceMarker = ({ position, onClick, hasModal }: EventProps) => {
  const { modalState, closeModal } = useModal()

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
      {modalState.isOpen && (
        <CustomOverlayMap position={position}>
          <SelectModal />
        </CustomOverlayMap>
      )}
    </>
  )
}

export default PlaceMarker
