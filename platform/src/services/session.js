const saveSession = (user) => {
  window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
}

const deleteSession = () => {
  window.localStorage.removeItem('loggedAppUser')
}

const getSession = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
  return loggedUserJSON ? JSON.parse(loggedUserJSON) : null
}

export default { saveSession, deleteSession, getSession }
