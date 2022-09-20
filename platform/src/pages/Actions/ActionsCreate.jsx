import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { InputMask } from 'primereact/inputmask'
import { MultiSelect } from 'primereact/multiselect'
import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import PageHeader from '../../components/PageHeader'
import employeesService from '../../services/employees'
import getLocalAccount from '../../utils/getLocalAccount'

export default function ActionsCreate () {
  const [recurrance, setRecurrance] = useState('')
  const [recurranceDays, setRecurranceDays] = useState([])
  const { accountRef, token } = getLocalAccount()
  const [employees, setEmployees] = useState([])
  const [selectedEmployees, setSelectedEmployees] = useState([])

  useEffect(() => {
    employeesService.getEmployees({ accountRef, token })
      .then(employees => {
        const employeesList = employees.map(employee => {
          return {
            label: `${employee.name} ${employee.surname}`,
            value: employee.id
          }
        })

        setEmployees(employeesList)
      })
  }, [setEmployees])

  const recurranceSelectItems = [
    { label: 'Diaria', value: 'DAILY' },
    { label: 'Semanal', value: 'WEEKLY' },
    { label: 'Mensual', value: 'MONTHLY' }
  ]

  const recurranceDaysSelectItems = [
    { label: 'Lunes', value: 'EVERY_MONDAY' },
    { label: 'Martes', value: 'EVERY_TUESDAY' },
    { label: 'Miércoles', value: 'EVERY_WEDNESDAY' },
    { label: 'Jueves', value: 'EVERY_THURSDAY' },
    { label: 'Viernes', value: 'EVERY_FRIDAY' },
    { label: 'Sábado', value: 'EVERY_SATURDAY' },
    { label: 'Domingo', value: 'EVERY_SUNDAY' }
  ]

  return (
    <Layout>
      <PageHeader title='Crear acción' />

      <main>
        <div className='sm:px-6 lg:px-8'>
          <div className='px-4 py-8 sm:px-0'>
            <div className='max-w-3xl mx-auto sm:px-6 lg:px-8'>
              <form>
                <div className='mb-4'>
                  <label className='mb-2 text-gray-500' htmlFor='signingIn'>Fecha de inicio</label>
                  <Calendar name='signingIn' value='signingIn' className='w-full' placeholder='Selecciona una fecha de inicio' />
                </div>
                <div className='mb-4'>
                  <label className='mb-2 text-gray-500' htmlFor='signingOut'>Fecha de fin</label>
                  <Calendar name='signingOut' value='signingOut' className='w-full' placeholder='Selecciona una fecha de fin' />
                </div>
                <div className='mb-4'>
                  <label className='mb-2 text-gray-500' htmlFor='hour'>Hora</label>
                  <InputMask name='hour' mask='99:99' value='hour' placeholder='HH:00' className='w-full' />
                </div>
                <div className='mb-4'>
                  <label className='mb-2 text-gray-500' htmlFor='duration'>Duración</label>
                  <InputMask name='duration' mask='99:99' value='duration' placeholder='HH:00' className='w-full' />
                </div>
                <div className='mb-4'>
                  <label className='mb-2 text-gray-500' htmlFor='recurrance'>Recurrencia</label>
                  <Dropdown
                    name='recurrance'
                    value={recurrance}
                    options={recurranceSelectItems}
                    onChange={(e) => setRecurrance(e.value)}
                    placeholder='Selecciona la recurrencia'
                    className='w-full'
                  />
                </div>
                {recurrance === 'MONTHLY' && (
                  <div className='mb-4 text-sm text-orange-400 px-2 py-1 bg-orange-100 border border-orange-200 rounded'>La fecha de inicio será la que marque que día de cada mes se hará el servicio</div>
                )}

                {recurrance === 'WEEKLY' && (
                  <div className='mb-4'>
                    <label className='mb-2 text-gray-500' htmlFor='recurranceDays'>Días por semana</label>
                    <MultiSelect
                      name='recurranceDays'
                      value={recurranceDays}
                      options={recurranceDaysSelectItems}
                      onChange={(e) => setRecurranceDays(e.value)}
                      placeholder='Selecciona los dias por semana'
                      className='w-full'
                      display='chip'
                    />
                  </div>
                )}

                <div className='mb-4'>
                  <label className='mb-2 text-gray-500' htmlFor='recurranceDays'>Asignar empleados</label>
                  <MultiSelect
                    name='recurranceDays'
                    value={selectedEmployees}
                    options={employees}
                    onChange={(e) => setSelectedEmployees(e.value)}
                    placeholder='Selecciona los empleados asignados'
                    className='w-full'
                    display='chip'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
