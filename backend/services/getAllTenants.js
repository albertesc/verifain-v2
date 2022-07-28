const accountSchema = require('../models/Account').schema

const getAllTenants = async adminDbConnection => {
  try {
    const Tenant = await adminDbConnection.model('Account', accountSchema)
    const tenants = await Tenant.find({})
    return tenants
  } catch (error) {
    console.log('getAllTenants error', error)
    throw error
  }
}

module.exports = getAllTenants
