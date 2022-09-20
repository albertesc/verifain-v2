import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import loginService from '../services/login'

export default function useUser () {
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const usr = JSON.parse(loggedUserJSON)
      dispatch(usr)
    }
  }, [])

  const login = async ({ email, password }) => {
    const usr = await loginService.login({ email, password })
    window.localStorage.setItem('loggedAppUser', JSON.stringify(usr))
    setUser(usr)
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedAppUser')
    navigate('/login')
  }

  return { user, login, logout }
}
