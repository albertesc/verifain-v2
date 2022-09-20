import { useDispatch } from 'react-redux'
import { changeStateToLogin, changeStateToLogout } from '../reducers/authReducer'
import loginService from '../services/login'
import sessionService from '../services/session'

export default function useAuth () {
  const dispatch = useDispatch()

  const login = async ({ email, password }) => {
    const user = await loginService.login({ email, password })
    sessionService.saveSession(user)
    dispatch(changeStateToLogin(user))
  }

  const logout = () => {
    sessionService.deleteSession()
    dispatch(changeStateToLogout())
  }

  return { login, logout }
}
