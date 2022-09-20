import sessionService from '../services/session'

const user = sessionService.getSession()

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null }

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user
      }
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        user: null
      }
    default:
      return state
  }
}

export const changeStateToLogin = user => {
  return {
    type: 'LOGIN',
    payload: { user }
  }
}

export const changeStateToLogout = () => {
  return {
    type: 'LOGOUT'
  }
}

export default authReducer
