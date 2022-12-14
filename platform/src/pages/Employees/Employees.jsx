import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { useState } from 'react'
import Layout from '../../components/Layout'
import RowEdit from '../../components/RowEdit'
import useEmployees from '../../hooks/useEmployees'

export default function Employees () {
  const [employees, loading] = useEmployees()

  const [globalFilterValue, setGlobalFilterValue] = useState('')
  const [filters, setFilters] = useState({
    global: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS
    },
    name: {
      operator: FilterOperator.AND,
      constraints: [{
        value: null,
        matchMode: FilterMatchMode.STARTS_WITH
      }]
    },
    weekHours: {
      operator: FilterOperator.AND,
      constraints: [{
        value: null,
        matchMode: FilterMatchMode.STARTS_WITH
      }]
    }
  })

  const FilterChange = (e) => {
    const value = e.target.value
    const _filters = { ...filters }
    _filters.global.value = value

    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  const tableHeaderTemplate = () => {
    return (
      <div className='flex justify-end'>
        <input
          className='appearance-none w-72 block px-4 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500'
          value={globalFilterValue} onChange={FilterChange}
          placeholder='Buscar por nombre o horas'
        />
      </div>
    )
  }

  return (
    <Layout>
      <main>
        <div className='sm:px-6 lg:px-8'>
          <div className='px-4 py-8 sm:px-0'>
            {loading
              ? (
                <div className='text-center'>Cargando datos...</div>
                )
              : (
                <DataTable
                  value={employees}
                  emptyMessage='No hay empleados con esos filtros'
                  header={tableHeaderTemplate}
                  filters={filters}
                  rows={10}
                  size='small'
                  responsiveLayout='scroll'
                  paginator showGridlines
                >
                  <Column field='name' header='Nombre' />
                  <Column field='phone' header='Telefono' />
                  <Column field='weekHours' header='Horas semanales' />
                  <Column header='Editar' body={RowEdit} />
                </DataTable>
                )}
          </div>
        </div>
      </main>
    </Layout>
  )
}
