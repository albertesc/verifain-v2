import { InputText } from 'primereact/inputtext'
import { Controller } from 'react-hook-form'
import FormError from './FormError'
import FormLabel from './FormLabel'

export default function FormInput ({ control, name, label, placeholder, error }) {
  return (
    <div className='mb-4'>
      <FormLabel htmlFor={name} label={label} />
      <Controller
        name={name} defaultValue='' control={control} autoFous render={({ field }) => (
          <InputText
            {...field}
            id={field.name}
            className='w-full'
            placeholder={placeholder}
          />
        )}
      />
      <FormError error={error} />
    </div>
  )
}
