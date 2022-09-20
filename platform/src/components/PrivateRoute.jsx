import { useSelector } from 'react-redux'

export default function PrivateRoute ({ children }) {
  const user = useSelector(state => state.user)

  !user && (window.location.href = '/login')

  return children
}
