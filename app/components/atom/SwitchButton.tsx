import React from 'react'
import { Switch } from '@headlessui/react'

interface SwitchButtonProps {
  id?: string
  value: boolean
  label?: string
  disabled?: boolean
  changeHandler?: () => void
}

const SwitchButton = ({ id, value, label = '', disabled = false, changeHandler }: SwitchButtonProps) => {
  return (
    <Switch.Group>
      <div className='flex items-center'>
        {label ? <Switch.Label className='mr-4'>{label}</Switch.Label> : undefined}
        <Switch
          id={id}
          checked={value}
          className={`${
            value ? 'bg-emerald-500' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
          onChange={changeHandler}
          disabled={disabled}>
          <span
            className={`${
              value ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
      </div>
    </Switch.Group>
  )
}

export default SwitchButton
