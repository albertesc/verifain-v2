const getEmployeeModel = async dbConnection => {
  const EmployeeModel = await dbConnection.model('Employee', require('../models/Employee').schema)
  return EmployeeModel
}

module.exports = getEmployeeModel
