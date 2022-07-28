const getLabelModel = async dbConnection => {
  const LabelModel = await dbConnection.model('Label', require('../models/Label').schema)
  return LabelModel
}

module.exports = getLabelModel
