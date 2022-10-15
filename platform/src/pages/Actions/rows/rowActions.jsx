import { ConfirmDialog } from 'primereact/confirmdialog'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import actionsService from '../../../services/actions'

const rowActions = ({ id }) => {
  const [visible, setVisible] = useState(false)

  const accept = () => {
    actionsService.deleteAction(id)
    setVisible(false)
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

export default rowActions
