import { MultiSelect } from 'primereact/multiselect'
import { Controller } from 'react-hook-form'
import FormError from './FormError'
import FormLabel from './FormLabel'

export default function FormMultiSelect ({ control, data, name, label, placeholder, error }) {
  return (
    <div className='mb-4'>
      <FormLabel htmlFor={name} label={label} />
      <Controller
        name={name} control={control} autoFous render={({ field }) => (
          <MultiSelect
            {...field}
            id={field.name}
            options={data}
            placeholder={placeholder}
            className='w-full'
            display='chip'
            onChange={(e) => field.onChange(e.value)}
          />
        )}
      />
      <FormError error={error} />
    </div>
  )
}
