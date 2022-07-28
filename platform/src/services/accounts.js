import axios from 'axios'

const getAccounts = async () => {
  const response = await axios.get('/api/accounts')
  return response.data
}

const createAccount = async ({ username, email, password, companyName }) => {
  const newAccount = {
    accountName: companyName,
    companyName,
    accountRef: username,
    email,
    password
  }
  await axios.post('/api/accounts', newAccount)
}

export default { getAccounts, createAccount }
