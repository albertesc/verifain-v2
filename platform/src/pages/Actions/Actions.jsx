import { Calendar } from 'primereact/calendar'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { useState } from 'react'
import Layout from '../../components/Layout'
import PageHeader from '../../components/PageHeader'
import useActions from '../../hooks/useActions'
import getLocaleString from '../../utils/getLocaleString'
import rowEmployees from './rows/rowEmployees'
import rowScheduled from './rows/rowScheduled'
import rowSigningIn from './rows/rowSigningIn'
import rowSigningOut from './rows/rowSigningOut'
import rowStatus from './rows/rowStatus'
import rowWorkedHours from './rows/rowWorkedHours'

export default function Clients () {
  const [filterDate, setFilterDate] = useState(getLocaleString(new Date().toISOString()))
  const [actions, loading] = useActions(filterDate)

  const Employees = rowData => rowEmployees(rowData)
  const SigningIn = rowData => rowSigningIn(rowData, filterDate)
  const SigningOut = rowData => rowSigningOut(rowData, filterDate)
  const WorkedHours = rowData => rowWorkedHours(rowData, filterDate)
  const Scheduled = rowData => rowScheduled(rowData)
  const Status = rowData => rowStatus(rowData, filterDate)

  const handleDateChange = (date) => setFilterDate(getLocaleString(date))

  return (
    <Layout>
      <PageHeader title='Actions' />

      <main>
        <div className='sm:px-6 lg:px-8'>
          <div className='px-4 py-8 sm:px-0'>
            <div className='mb-6'>
              Servicios programados para el día
              <span className='bg-gray-200 ml-2 px-2 tracking-wider py-1 rounded text-gray-500'>
                {new Date(filterDate).toLocaleDateString()}
              </span>
            </div>
            <div className='flex gap-x-6'>
              <div className='flex-none'>
                <Calendar value={filterDate} onChange={e => handleDateChange(e.value)} inline />
              </div>
              <div className='w-full'>
                {loading
                  ? (
                    <div className='text-center'>Cargando datos...</div>
                    )
                  : (
                    <DataTable
                      value={actions} emptyMessage='No hay acciones con esos filtros' rows={10} size='small'
                      responsiveLayout='scroll' paginator showGridlines
                    >
                      <Column field='location.name' header='Local' />
                      <Column body={Employees} header='Empleados' />
                      <Column field='hour' header='Hora' />
                      <Column field='duration' header='Duración' />
                      <Column body={SigningIn} header='Fecha de entrada' />
                      <Column body={SigningOut} header='Fecha de salida' />
                      <Column body={WorkedHours} header='Horas trabajadas' />
                      <Column body={Scheduled} header='Programado' />
                      <Column body={Status} header='Estado servicio' />
                    </DataTable>
                    )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
