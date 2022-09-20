import axios from 'axios'
import getRandomToken from '../utils/getRandomToken'

const adminHeaders = { headers: { authorization: 'admin_token' } }

const getAccounts = async () => {
  const response = await axios.get('/api/accounts', adminHeaders)
  return response.data
}

const createAccount = async ({ username, email, password, companyName }) => {
  const newAccount = {
    accountName: companyName,
    companyName,
    accountRef: `${username}-${getRandomToken()}`,
    email,
    password
  }
  await axios.post('/api/accounts', newAccount, adminHeaders)
}

export default { getAccounts, createAccount }
