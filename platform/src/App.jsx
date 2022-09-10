import { Route, Routes } from 'react-router-dom'
import Actions from './pages/Actions/Actions'
import ActionsCreate from './pages/Actions/ActionsCreate'
import Clients from './pages/Clients/Clients'
import Employees from './pages/Employees/Employees'
import Labels from './pages/Labels'
import Login from './pages/Login'
import Register from './pages/Register'
import Reports from './pages/Reports'

function App () {
  return (
    <Routes>
      <Route path='/' element={<Actions />} />
      <Route path='/actions/create' element={<ActionsCreate />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/employees' element={<Employees />} />
      <Route path='/clients' element={<Clients />} />
      <Route path='/reports' element={<Reports />} />
      <Route path='/labels' element={<Labels />} />
    </Routes>
  )
}

export default App
