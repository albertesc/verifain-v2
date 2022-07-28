const { getNamespace, createNamespace } = require('continuation-local-storage')
const { default: mongoose } = require('mongoose')
const initAdminDbConnection = require('../db/admin')
const getAllTenants = require('../services/getAllTenants')

let adminDbConnection
const nameSpace = createNamespace('unique context')
const BASE_DB_URI = process.env.BASE_DB_URI
const ADMIN_DB_NAME = process.env.ADMIN_DB_NAME

const connectAllDb = async () => {
  const ADMIN_DB_URI = `${BASE_DB_URI}/${ADMIN_DB_NAME}`
  adminDbConnection = initAdminDbConnection(ADMIN_DB_URI)
  console.log('Admin MongoDB Connection ok!')
}

const getConnectionByTenant = accountRef => {
  console.log(`Getting connection for ${accountRef}`)

  const tenantConnection = mongoose.createConnection(`${BASE_DB_URI}/${accountRef}`)
  return tenantConnection
}

const getAdminConnection = () => {
  console.log('Getting connection for Admin')
  if (adminDbConnection) {
    return adminDbConnection
  }
}

const resolveTenant = async (req, res, next) => {
  const accountRef = req.headers.tenant
  const tenants = await getAllTenants(adminDbConnection)

  if (!accountRef || !tenants.find(tenant => tenant.accountRef === accountRef)) {
    return res
      .status(500)
      .json({ error: 'Please provide tenant\'s name to connect' })
  }

  nameSpace.run(() => {
    const tenantDbConnection = getConnectionByTenant(accountRef)
    nameSpace.set('connection', tenantDbConnection)
    next()
  })
}

const resolveAdmin = (req, res, next) => {
  nameSpace.run(() => {
    const adminDbConnection = getAdminConnection()
    nameSpace.set('connection', adminDbConnection)
    next()
  })
}

const getConnection = tenant => {
  const nameSpace = getNamespace('unique context')
  const conn = nameSpace.get('connection')
  if (!conn) { throw new Error('Connection is not set for any tenant database') }
  return conn
}

module.exports = { resolveTenant, resolveAdmin, connectAllDb, getConnection }
