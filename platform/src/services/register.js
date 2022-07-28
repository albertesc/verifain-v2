import axios from 'axios'

const register = async user => {
  const response = await axios.post('/api/users', user)
  return response.data
}

export default { register }
