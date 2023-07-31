import React, { forwardRef, ChangeEvent } from 'react'
import { BsPlusSquare } from 'react-icons/bs'
import { register } from 'swiper/element/swiper-element'

type InputFileProps = {
  id: string
  accept?: string
  multiple?: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  styleOption?: string
  dotted?: boolean
}

const InputFile = forwardRef(
  ({ id, accept = 'image/*', multiple = false, onChange, styleOption, dotted = false }: InputFileProps, ref) => {
    return (
      <>
        <label htmlFor={id} className={`-me-7, ${styleOption}`} style={{ cursor: 'pointer' }}>
          {dotted ? (
            <svg className='h-12 w-12' stroke='currentColor' fill='none' viewBox='0 0 48 48' aria-hidden='true'>
              <path
                d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          ) : (
            <BsPlusSquare size='24' color={'#33CC99'} className={'hover:!text-[#32D7A0]'} />
          )}
          <input id={id} type='file' multiple={multiple} accept={accept} onChange={onChange} hidden />
        </label>
      </>
    )
  }
)

InputFile.displayName = 'InputFile'

export default InputFile
