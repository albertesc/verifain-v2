const getClientModel = async dbConnection => {
  const ClientModel = await dbConnection.model('Client', require('../models/Client').schema)
  return ClientModel
}

module.exports = getClientModel
