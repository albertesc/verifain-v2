import Layout from '../../components/Layout'
import PageHeader from '../../components/PageHeader'
import ActionsForm from './ActionsForm'

export default function ActionsCreate () {
  return (
    <Layout>
      <PageHeader title='Crear acción' />

      <main>
        <div className='sm:px-6 lg:px-8'>
          <div className='px-4 py-8 sm:px-0'>
            <div className='max-w-3xl mx-auto sm:px-6 lg:px-8'>
              <ActionsForm />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
