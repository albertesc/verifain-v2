import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../components/Layout'
import PageHeader from '../../components/PageHeader'
import actionsService from '../../services/actions'
import ActionsForm from './ActionsForm'

export default function ActionsUpdate () {
  const { id } = useParams()
  const [action, setAction] = useState(null)
  const [defaultValues, setDefaultValues] = useState(null)

  useEffect(() => {
    actionsService.getActionById(id)
      .then(action => {
        setAction(action)
        setDefaultValues({
          id: action.id,
          startDate: new Date(action.startDate),
          endDate: new Date(action.endDate),
          hour: action.hour,
          duration: action.duration,
          recurrance: action.recurrance,
          recurranceDays: action.recurranceDays,
          employees: action.employees.map(employee => employee.id),
          locationId: action.location.id,
          active: action.active,
          alarm: action.alarm
        })
      })
  }, [])

  return (
    <Layout>
      <PageHeader title='Crear acción' />

      <main>
        <div className='sm:px-6 lg:px-8'>
          <div className='px-4 py-8 sm:px-0'>
            <div className='max-w-3xl mx-auto sm:px-6 lg:px-8'>
              {!action && !defaultValues
                ? <div className='text-center'>Cargando datos...</div>
                : <ActionsForm defaultValues={defaultValues} />}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
