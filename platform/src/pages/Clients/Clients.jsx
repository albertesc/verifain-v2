import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import Layout from '../../components/Layout'
import PageHeader from '../../components/PageHeader'
import RowEdit from '../../components/RowEdit'
import useClients from '../../hooks/useClients'

export default function Clients () {
  const [clients, loading] = useClients()

  const rowActive = (rowData) => rowData.active ? 'Sí' : 'No'

  const rowLocales = (rowData) => {
    return (
      <div>
        {rowData.locations
          .map(location => <a href='#' className='text-indigo-500 underline' key={location.id}>{location.name}</a>)
          .reduce((prev, curr) => [prev, ', ', curr])}
        <a href='#' className='text-white bg-indigo-500 px-2 py-1 rounded-md text-sm leading-none ml-2'>Añadir más</a>
      </div>
    )
  }

  return (
    <Layout>
      <PageHeader title='Clientes' />

      <main>
        <div className='sm:px-6 lg:px-8'>
          <div className='px-4 py-8 sm:px-0'>
            {loading
              ? (
                <div className='text-center'>Cargando datos...</div>
                )
              : (
                <DataTable
                  value={clients}
                  emptyMessage='No hay empleados con esos filtros'
                  rows={10}
                  size='small'
                  responsiveLayout='scroll'
                  paginator showGridlines
                >
                  <Column field='name' header='Nombre' />
                  <Column field='address' header='Dirección' />
                  <Column body={rowActive} header='Activo' />
                  <Column body={rowLocales} header='Locales' />
                  <Column body={RowEdit} header='Acciones' />
                </DataTable>
                )}
          </div>
        </div>
      </main>
    </Layout>
  )
}
