import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface TextAreaProps {
  label?: string
  name?: string
  register?: UseFormRegisterReturn
  essential?: boolean
  [key: string]: any
  placeholder?: string
  rows?: number
}

const TextArea = ({ label, name, register, essential, rows = 4, placeholder, ...rest }: TextAreaProps) => {
  return (
    <div>
      {label ? (
        <label htmlFor={name} className='mb-2 block text-xs font-medium text-gray-700'>
          {essential && <span className={'text-red-500'}>*</span>}
          {label}
        </label>
      ) : null}
      <textarea
        id={name}
        {...register}
        placeholder={placeholder}
        className='w-full rounded-md border-gray-300 text-[13px] placeholder-gray-400 shadow-sm placeholder:text-[12px] placeholder:font-light focus:border-[#32D7A0] focus:outline-none focus:ring-0'
        rows={rows}
        {...rest}
      />
    </div>
  )
}

export default TextArea
