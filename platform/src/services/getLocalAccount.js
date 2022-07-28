export default function getLocalAccount () {
  const account = JSON.parse(window.localStorage.getItem('loggedAppUser'))
  const { accountRef, token } = account
  return { accountRef, token }
}
