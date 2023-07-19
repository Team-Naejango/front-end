import React, { forwardRef, ChangeEvent } from 'react'
import { BsPlusSquare } from 'react-icons/bs'

type InputFileProps = {
  id: string
  accept?: string
  multiple?: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  styleOption?: object
}

const InputFile = forwardRef(
  ({ id, accept = 'image/*', multiple = false, onChange, styleOption }: InputFileProps, ref) => {
    return (
      <>
        <label htmlFor={id} className={'-me-7'} style={{ cursor: 'pointer' }}>
          <BsPlusSquare size='24' color={'#33CC99'} className={'hover:!text-[#32D7A0]'} />
          <input id={id} type='file' multiple={multiple} accept={accept} onChange={onChange} hidden />
        </label>
      </>
    )
  }
)

InputFile.displayName = 'InputFile'

export default InputFile
