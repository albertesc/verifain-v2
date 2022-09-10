import axios from 'axios'

const getLocations = async ({ accountRef, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      tenant: accountRef
    }
  }
  const locations = await axios.get('/api/locations', config)
  return locations.data
}

export default { getLocations }
