import React, { ReactNode } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface InputProps {
  label?: string
  id?: string
  kind?: 'text'
  type: string
  register?: UseFormRegisterReturn
  required?: boolean
  placeholder?: string
  autoComplete?: string
  icon?: ReactNode
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  maxLength?: number
  disabled?: boolean
}

export const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  return ['e', 'E', '+', '-'].includes(event.key) && event.preventDefault()
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
  onKeyDown,
  maxLength,
  disabled,
}: InputProps) {
  return (
    <>
      <label className='mb-1 block text-xs font-medium leading-none text-gray-700' htmlFor={id}>
        {label}
      </label>
      {kind === 'text' ? (
        <div className='relative flex flex-[3_3_0%] items-center rounded-md shadow-sm'>
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
            onKeyDown={type === 'number' ? handleKeyDown : onKeyDown}
            maxLength={maxLength}
            disabled={disabled}
            className={`w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-[13px] placeholder-gray-400 placeholder:text-[12px] focus:border-[#A3D139] focus:outline-none focus:ring-emerald-50
             ${icon ? 'indent-5' : null}`}
          />
          {icon}
        </div>
      ) : null}
    </>
  )
}
