import { Calendar } from 'primereact/calendar'
import { Controller } from 'react-hook-form'
import FormError from './FormError'
import FormLabel from './FormLabel'

export default function FormCalendar ({ control, name, label, placeholder, error }) {
  return (
    <div className='mb-4'>
      <FormLabel htmlFor={name} label={label} />
      <Controller
        name={name} control={control} autoFous render={({ field }) => (
          <Calendar
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
