import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import Layout from '../../components/Layout'
import PageHeader from '../../components/PageHeader'
import useLabels from '../../hooks/useLabels'

export default function Labels () {
  const [labels, loading] = useLabels()

  return (
    <Layout>
      <PageHeader title='Etiquetas' />

      <main>
        <div className='sm:px-6 lg:px-8'>
          <div className='px-4 py-8 sm:px-0'>
            {loading
              ? (
                <div className='text-center'>Cargando datos...</div>
                )
              : (
                <DataTable
                  value={labels}
                  emptyMessage='No hay empleados con esos filtros'
                  rows={10}
                  size='small'
                  responsiveLayout='scroll'
                  paginator showGridlines
                >
                  <Column field='reference' header='Referencia' />
                </DataTable>
                )}
          </div>
        </div>
      </main>
    </Layout>
  )
}
