import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import FormCalendar from '../../components/FormCalendar'
import FormDropdown from '../../components/FormDropdown'
import FormInputTime from '../../components/FormInputTime'
import FormMultiSelect from '../../components/FormMultiSelect'
import useEmployees from '../../hooks/useEmployees'
import useLocations from '../../hooks/useLocations'
import useRecurrance from '../../hooks/useRecurrance'
import actionsSchema from '../../schemas/actionsSchema'
import actionsService from '../../services/actions'

export default function actionsForm ({ defaultValues }) {
  const [employees, loadingEmployees] = useEmployees()
  const [locations, loadingLocations] = useLocations()
  const { recurranceOptions, recurranceDays } = useRecurrance()
  const navigate = useNavigate()

  const {
    control,
    formState,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    resolver: yupResolver(actionsSchema),
    defaultValues,
    mode: 'onChange'
  })
  const recurranceField = watch('recurrance')

  const employeesOptions = employees.map(employee => ({
    label: `${employee.name} ${employee.surname}`,
    value: employee.id
  }))

  const locationsOptions = locations.map(location => ({
    label: location.name,
    value: location.id
  }))

  const onSubmit = action => {
    !defaultValues
      ? actionsService.createAction(action)
      : actionsService.updateAction(action)
    navigate('/actions')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormCalendar
        control={control} name='startDate' label='Fecha de inicio*'
        placeholder='Selecciona una fecha de inicio' error={errors.startDate?.message}
      />
      <FormCalendar
        control={control} name='endDate' label='Fecha de fin*'
        placeholder='Selecciona una fecha de fin' error={errors.endDate?.message}
      />
      <FormInputTime
        control={control} name='hour' label='Hora*'
        placeholder='Selecciona una hora de inicio (HH:MM)' error={errors.hour?.message}
      />
      <FormInputTime
        control={control} name='duration' label='Duración*'
        placeholder='Selecciona una duración (HH:MM)' error={errors.duration?.message}
      />
      <FormDropdown
        control={control} data={recurranceOptions} name='recurrance' label='Recurrencia*'
        placeholder='Selecciona una recurrencia' error={errors.recurrance?.message}
      />
      {recurranceField === 'MONTHLY' && (
        <div className='mb-4 text-sm text-orange-400 px-2 py-1 bg-orange-100 border border-orange-200 rounded'>
          El sistema basará como día recurrente la fecha de incio de la acción
        </div>
      )}
      {recurranceField === 'WEEKLY' && (
        <FormMultiSelect
          control={control} data={recurranceDays} name='recurranceDays' label='Días de la semana*'
          placeholder='Selecciona los días de la semana' error={errors.recurranceDays?.message}
        />
      )}
      {loadingEmployees
        ? (
          <>
            <span className='text-gray-500'>Empleados*</span>
            <span className='py-3 px-4 mb-4 block bg-white border border-gray-300 rounded-md w-full text-gray-300'>Cargando empleados...</span>
          </>
          )
        : (
          <FormMultiSelect
            control={control} data={employeesOptions} name='employees' label='Empleados*'
            placeholder='Selecciona los empleados' error={errors.employees?.message}
          />
          )}
      {loadingLocations
        ? (
          <>
            <span className='text-gray-500'>{`Local* ${defaultValues ? '(No se puede modificar)' : ''}`}</span>
            <span className='py-3 px-4 block bg-white border border-gray-300 rounded-md w-full text-gray-300'>Cargando locales...</span>
          </>
          )
        : (
          <FormDropdown
            control={control} data={locationsOptions} name='locationId' label={`Local* ${defaultValues ? '(No se puede modificar)' : ''}`}
            placeholder='Selecciona una localización' error={errors.locationId?.message} disabled={!!defaultValues}
          />
          )}

      <div className='flex gap-4 mt-8'>
        <Link className='w-full text-white text-center block bg-red-500 hover:bg-red-600 px-5 py-3 rounded-md' to='/actions'><span>Cancelar</span></Link>
        <Button type='submit' disabled={Object.keys(formState.dirtyFields).length === 0}>Guardar Acción</Button>
      </div>
    </form>
  )
}
