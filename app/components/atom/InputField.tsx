import React, { ReactNode } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface InputProps {
  label?: string
  id: string
  kind?: 'text'
  type: string
  register?: UseFormRegisterReturn
  required?: boolean
  placeholder?: string
  autoComplete?: string
  icon?: ReactNode
}

export default function InputField({
  label,
  id,
  kind = 'text',
  register,
  type,
  placeholder,
  required,
  autoComplete = 'off',
  icon,
}: InputProps) {
  return (
    <div>
      <label className='mb-1 block text-sm font-medium text-gray-700' htmlFor={id}>
        {label}
      </label>
      {kind === 'text' ? (
        <div className='relative flex items-center rounded-md shadow-sm'>
          <input
            type='password'
            style={{
              display: 'none',
            }}
            autoComplete='off'
          />
          <input
            id={id}
            required={required}
            {...register}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className={`w-full appearance-none rounded-md border border-gray-300 px-3 py-2.5 text-sm placeholder-gray-400 focus:border-[#A3D139] focus:outline-none focus:ring-emerald-50
             ${icon ? 'indent-5' : null}`}
          />
          {icon}
        </div>
      ) : null}
    </div>
  )
}
