const getLocationModel = async dbConnection => {
  const LocationModel = await dbConnection.model('Location', require('../models/Location').schema)
  return LocationModel
}

module.exports = getLocationModel
