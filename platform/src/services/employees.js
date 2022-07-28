import axios from 'axios'

const getEmployees = async ({ accountRef, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      tenant: accountRef
    }
  }
  const response = await axios.get('/api/employees', config)
  return response.data
}

const createEmployee = async (employee, { accountRef, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      tenant: accountRef
    }
  }
  const response = await axios.post('/api/employees', employee, config)
  return response.data
}

export default { getEmployees, createEmployee }
