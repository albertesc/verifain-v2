import { Checkbox } from 'primereact/checkbox'
import { Controller } from 'react-hook-form'
import FormError from './FormError'
import FormLabel from './FormLabel'

export default function FormCheckbox ({ control, name, label, checked, error }) {
  return (
    <div className='mb-4'>
      <Controller
        name={name} control={control} render={({ field }) => (
          <Checkbox
            inputId={field.name}
            onChange={(e) => field.onChange(e.checked)}
            checked={field.value}
            className='mr-3'
          />
        )}
      />
      <FormLabel htmlFor={name} label={label} />
      <FormError error={error} />
    </div>
  )
}
