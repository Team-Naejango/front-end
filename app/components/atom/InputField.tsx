import React from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface InputProps {
  label?: string
  name: string
  kind?: 'text' | 'phone' | 'price'
  type: string
  register?: UseFormRegisterReturn
  required?: boolean
  placeholder?: string
  autoComplete?: string
}

export default function InputField({
  label,
  name,
  kind = 'text',
  register,
  type,
  placeholder,
  required,
  autoComplete = 'off',
}: InputProps) {
  return (
    <div>
      <label className='mb-1 block text-sm font-medium text-gray-700' htmlFor={name}>
        {label}
      </label>
      {kind === 'text' ? (
        <div className='relative flex items-center  rounded-md shadow-sm'>
          <input
            type='text'
            style={{ width: '0px', height: '0px', position: 'absolute', border: '0', display: 'none' }}
            autoComplete='off'
          />
          <input
            type='password'
            style={{ width: '0px', height: '0px', position: 'absolute', border: '0', display: 'none' }}
            autoComplete='off'
          />
          <input
            id={name}
            required={required}
            {...register}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className='w-full appearance-none rounded-md border border-gray-300  px-3 py-2 text-sm placeholder-gray-400 focus:border-[#A3D139] focus:outline-none focus:ring-[#A3D139]'
          />
        </div>
      ) : null}
    </div>
  )
}
