import axios from 'axios'

const getLabels = async ({ accountRef, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      tenant: accountRef
    }
  }
  const labels = await axios.get('/api/labels', config)
  return labels.data
}

export default { getLabels }
