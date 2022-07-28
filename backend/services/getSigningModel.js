const getSigningModel = async dbConnection => {
  const SigningModel = await dbConnection.model('Signing', require('../models/Signing').schema)
  return SigningModel
}

module.exports = getSigningModel
