import { Dropdown } from 'primereact/dropdown'
import { Controller } from 'react-hook-form'
import FormError from './FormError'
import FormLabel from './FormLabel'

export default function FormDropdown ({ control, data, name, label, placeholder, disabled, error }) {
  return (
    <div className='mb-4'>
      <FormLabel htmlFor={name} label={label} />
      <Controller
        name={name} control={control} autoFous render={({ field }) => (
          <Dropdown
            {...field}
            id={field.name}
            options={data}
            placeholder={placeholder}
            className='w-full'
            onChange={(e) => field.onChange(e.value)}
            disabled={disabled}
          />
        )}
      />
      <FormError error={error} />
    </div>
  )
}
