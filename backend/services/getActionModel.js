const getActionModel = async dbConnection => {
  const ActionModel = await dbConnection.model('Action', require('../models/Action').schema)
  return ActionModel
}

module.exports = getActionModel
