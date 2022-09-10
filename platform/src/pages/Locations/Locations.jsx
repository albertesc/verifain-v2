import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import Layout from '../../components/Layout'
import PageHeader from '../../components/PageHeader'
import RowEdit from '../../components/RowEdit'
import useLocations from '../../hooks/useLocations'

export default function Locations () {
  const [locations, loading] = useLocations()

  const rowAddress = (rowData) => {
    return `${rowData.address}, ${rowData.city} (${rowData.province}), ${rowData.country}`
  }

  const rowLabel = (rowData) => {
    return rowData.label ? rowData.label : 'Sin etiqueta'
  }

  return (
    <Layout>
      <PageHeader title='Locales' />

      <main>
        <div className='sm:px-6 lg:px-8'>
          <div className='px-4 py-8 sm:px-0'>
            {loading
              ? (
                <div className='text-center'>Cargando datos...</div>
                )
              : (
                <DataTable
                  value={locations}
                  emptyMessage='No hay empleados con esos filtros'
                  rows={10}
                  size='small'
                  responsiveLayout='scroll'
                  paginator showGridlines
                >
                  <Column field='client.name' header='Cliente' />
                  <Column field='name' header='Nombre local' />
                  <Column field={rowAddress} header='Dirección' />
                  <Column field={rowLabel} header='Etiqueta' />
                  <Column field={RowEdit} header='Acciones' />
                </DataTable>
                )}
          </div>
        </div>
      </main>
    </Layout>
  )
}
