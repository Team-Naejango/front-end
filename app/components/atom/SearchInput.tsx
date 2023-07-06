import React, { ChangeEventHandler, forwardRef, KeyboardEventHandler, ReactNode, RefCallback } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface InputProps {
  label?: string
  id?: string
  valueRef?: RefCallback<unknown>
  kind?: 'text'
  type: string
  value?: string
  register?: UseFormRegisterReturn
  required?: boolean
  placeholder?: string
  autoComplete?: string
  icon?: ReactNode
  onKeyDown?: KeyboardEventHandler
  maxLength?: number
  disabled?: boolean
  onChange?: ChangeEventHandler<any>
  className?: string
}

const SearchInput = forwardRef(
  (
    {
      label,
      id,
      valueRef,
      kind = 'text',
      register,
      type,
      value,
      placeholder,
      required,
      autoComplete = 'off',
      icon,
      onKeyDown,
      maxLength,
      disabled,
      onChange,
      className,
    }: InputProps,
    ref
  ) => {
    return (
      <>
        <label className='mb-1 block text-xs font-medium leading-none text-gray-700' htmlFor={id}>
          {label}
        </label>
        {kind === 'text' ? (
          <div className='mx-auto mb-3 flex items-center justify-center rounded-md'>
            <input
              id={id}
              ref={valueRef}
              required={required}
              value={value}
              {...register}
              type={type}
              onChange={onChange}
              onKeyDown={onKeyDown}
              placeholder={placeholder}
              autoComplete={autoComplete}
              maxLength={maxLength}
              disabled={disabled}
              className={`w-64 appearance-none rounded-md border border-gray-300 text-[13px] placeholder-gray-400 shadow-sm placeholder:text-[12px] focus:border-[#33CC99] focus:outline-none focus:ring-emerald-50 ${className} ${
                icon ? 'indent-5' : ''
              }`}
            />
            {icon}
          </div>
        ) : null}
      </>
    )
  }
)

SearchInput.displayName = 'SearchInput'

export default SearchInput
