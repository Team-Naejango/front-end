import React from 'react'
import { render } from '@testing-library/react'
import { FormProvider, useForm } from 'react-hook-form'

const FormProviderComponent = ({ ui }) => {
  const methods = useForm()
  return <FormProvider {...methods}>{ui}</FormProvider>
}

export function renderWithFormProvider(ui) {
  return render(<FormProviderComponent ui={ui} />)
}
