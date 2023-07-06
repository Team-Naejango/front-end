import React, { ReactNode, useState } from 'react'

import CustomModal from '@/app/components/molecule/modal/CustomModal'
import SelectBox from '@/app/components/atom/SelectBox'
import { KEEP_TYPES } from '@/app/libs/client/constants/warehouse'

const SelectModal = () => {
  const [selectedType, setSelectedType] = useState<{ name: string }>(KEEP_TYPES[0])

  return (
    <CustomModal>
      {/* <SelectBox title={'분류'} data={KEEP_TYPES} selected={selectedType} setSelected={setSelectedType} essential /> */}
    </CustomModal>
  )
}

export default SelectModal
