import axios from 'axios'

const baseUrl = '/api/login'
const adminHeaders = { headers: { authorization: 'admin_token' } }

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials, adminHeaders)
  return response.data
}

export default { login }
