import axios from 'axios'

const getClients = async ({ accountRef, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      tenant: accountRef
    }
  }
  const clients = await axios.get('/api/clients', config)
  return clients.data
}

export default { getClients }
