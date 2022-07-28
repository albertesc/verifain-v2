import { Route, Routes } from 'react-router-dom'
import Clients from './pages/Clients'
import Employees from './pages/Employees'
import Home from './pages/Home'
import Labels from './pages/Labels'
import Locations from './pages/Locations'
import Login from './pages/Login'
import Register from './pages/Register'
import Reports from './pages/Reports'
import Signings from './pages/Signings'

function App () {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/employees' element={<Employees />} />
      <Route path='/clients' element={<Clients />} />
      <Route path='/signings' element={<Signings />} />
      <Route path='/locations' element={<Locations />} />
      <Route path='/reports' element={<Reports />} />
      <Route path='/labels' element={<Labels />} />
      <Route path='/today' element={<Signings />} />
    </Routes>
  )
}

export default App
