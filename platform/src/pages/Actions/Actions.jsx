import { Column } from 'primereact/column'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { DataTable } from 'primereact/datatable'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import Layout from '../../components/Layout'
import PageHeader from '../../components/PageHeader'
import rowEmployees from '../../components/RowEmployees'
import actionsService from '../../services/actions'
import rowEndDate from './rows/rowEndDate'
import rowRecurrance from './rows/rowRecurrance'
import rowStartDate from './rows/rowStartDate'
// import { useSelector } from 'react-redux'

export default function Actions () {
  // const action = useSelector(state => state.actionsReducer)
  const [actions, setActions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    actionsService.getActions()
      .then(actions => {
        setActions(actions)
        setLoading(false)
      })
  }, [setActions])

  const Employees = rowData => rowEmployees(rowData)
  const StartDate = rowData => rowStartDate(rowData)
  const EndDate = rowData => rowEndDate(rowData)
  const Recurrance = rowData => rowRecurrance(rowData)
  const rowActions = ({ id }) => {
    const [visible, setVisible] = useState(false)

    const accept = () => {
      setLoading(true)
      actionsService.deleteAction(id)
        .then(() => {
          setActions(actions.filter(action => action.id !== id))
          setVisible(false)
          setLoading(false)
        })
    }

    const reject = () => {
      setVisible(false)
    }

    return (
      <>
        <Link to={`/actions/update/${id}`} className='underline'>Modificar</Link>

        <ConfirmDialog
          breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }}
          visible={visible} onHide={() => setVisible(false)} message={`Esta acción con ID: ${id} no se podrá recuperar. Estas seguro de eliminar esta acción?`}
          header='Confirmacion de borrado' icon='pi pi-exclamation-triangle' accept={accept} reject={reject}
        />
        <button className='underline ml-4' onClick={() => setVisible(true)}>Borrar</button>
      </>
    )
  }

  return (
    <Layout>
      <PageHeader title='Acciones' />

      <main>
        <div className='sm:px-6 lg:px-8'>
          <div className='px-4 py-8 sm:px-0'>
            {loading
              ? (
                <div className='text-center'>Cargando datos...</div>
                )
              : (
                <DataTable
                  value={actions} emptyMessage='No hay acciones con esos filtros' rows={30} size='small'
                  responsiveLayout='scroll' paginator showGridlines
                >
                  <Column body={StartDate} header='Fecha de inicio' />
                  <Column body={EndDate} header='Fecha de fin' />
                  <Column field='location.name' header='Local' />
                  <Column body={Employees} header='Empleados' />
                  <Column field='hour' header='Hora' />
                  <Column field='duration' header='Duración' />
                  <Column body={Recurrance} header='Recurrencia' />
                  <Column body={rowActions} header='Acciones' />
                </DataTable>
                )}

            <Link to='/actions/create'><Button className='my-8'>Crear Acción</Button></Link>
          </div>
        </div>
      </main>
    </Layout>
  )
}
