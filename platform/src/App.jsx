import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { legacy_createStore as createStore } from 'redux'
import PrivateRoute from './components/PrivateRoute'
import Actions from './pages/Actions/Actions'
import ActionsCreate from './pages/Actions/ActionsCreate'
import ActionsUpdate from './pages/Actions/ActionsUpdate'
import Clients from './pages/Clients/Clients'
import Employees from './pages/Employees/Employees'
import Labels from './pages/Labels/Labels'
import Locations from './pages/Locations/Locations'
import Login from './pages/Login'
import Register from './pages/Register'
import Reports from './pages/Reports'
import Schedule from './pages/Schedule/Schedule'
import authReducer from './reducers/authReducer.js'

const store = createStore(authReducer)

function App () {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<PrivateRoute><Schedule /></PrivateRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/actions' element={<PrivateRoute><Actions /></PrivateRoute>} />
        <Route path='/actions/create' element={<PrivateRoute><ActionsCreate /></PrivateRoute>} />
        <Route path='/actions/update/:id' element={<PrivateRoute><ActionsUpdate /></PrivateRoute>} />
        <Route path='/employees' element={<PrivateRoute><Employees /></PrivateRoute>} />
        <Route path='/clients' element={<PrivateRoute><Clients /></PrivateRoute>} />
        <Route path='/locations' element={<PrivateRoute><Locations /></PrivateRoute>} />
        <Route path='/reports' element={<PrivateRoute><Reports /></PrivateRoute>} />
        <Route path='/labels' element={<PrivateRoute><Labels /></PrivateRoute>} />
      </Routes>
    </Provider>
  )
}

export default App
