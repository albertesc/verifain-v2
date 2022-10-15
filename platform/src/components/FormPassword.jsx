import { Password } from 'primereact/password'
import { Controller } from 'react-hook-form'
import FormError from './FormError'
import FormLabel from './FormLabel'

export default function FormInput ({ control, name, label, placeholder, feedback, error }) {
  return (
    <div className='mb-4'>
      <FormLabel htmlFor={name} label={label} />
      <Controller
        name={name} defaultValue='' control={control} autoFous render={({ field }) => (
          <Password
            {...field}
            id={field.name}
            className='w-full'
            inputClassName='w-full'
            placeholder={placeholder}
            toggleMask
            feedback={feedback}
          />
        )}
      />
      <FormError error={error} />
    </div>
  )
}
