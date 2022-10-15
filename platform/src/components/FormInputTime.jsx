import { InputMask } from 'primereact/inputmask'
import { Controller } from 'react-hook-form'
import FormError from './FormError'
import FormLabel from './FormLabel'

export default function FormInputTime ({ control, name, label, placeholder, error }) {
  return (
    <div className='mb-4'>
      <FormLabel htmlFor={name} label={label} />
      <Controller
        name={name} control={control} autoFous render={({ field }) => (
          <InputMask
            {...field}
            id={field.name}
            mask='99:99'
            placeholder={placeholder}
            className='w-full'
          />
        )}
      />
      <FormError error={error} />
    </div>
  )
}
