const getAccountModel = async dbConnection => {
  const AccountModel = await dbConnection.model('Account', require('../models/Account').schema)
  return AccountModel
}

module.exports = getAccountModel
