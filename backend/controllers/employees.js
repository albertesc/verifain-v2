const employeesRouter = require('express').Router()
const authorization = require('../middleware/authorization')
const getEmployeeModel = require('../services/getEmployeeModel')
const getSigningModel = require('../services/getSigningModel')
const { getConnection } = require('../middleware/connectionResolver')

employeesRouter.get('/', authorization, async (_, res) => {
  const dbConnection = await getConnection()
  const Employee = await getEmployeeModel(dbConnection)
  await getSigningModel(dbConnection)

  Employee.find({})
    .populate('signings', 'signingIn signingOut location')
    .then(employees => res.status(200).json(employees))
})

employeesRouter.get('/:id', async (req, res, next) => {
  const dbConnection = await getConnection()
  const Employee = await getEmployeeModel(dbConnection)
  await getSigningModel(dbConnection)

  Employee.findById(req.params.id)
    .populate('signings', 'signingIn signingOut location')
    .then(signing => {
      signing
        ? res.status(200).json(signing)
        : res.status(404).end()
    })
    .catch(err => { console.log(err); next(err) })
})

employeesRouter.post('/', authorization, async (req, res, next) => {
  const dbConnection = await getConnection()
  const Employee = await getEmployeeModel(dbConnection)

  const {
    name,
    surname,
    address,
    phone,
    nif,
    weekHours,
    active,
    closed
  } = req.body

  await new Employee({
    name,
    surname,
    address,
    phone,
    nif,
    weekHours,
    active,
    closed
  }).save()
    .then(savedEmployee => res.status(201).json(savedEmployee))
    .catch(err => next(err))
})

employeesRouter.put('/:id', authorization, async (req, res, next) => {
  const dbConnection = await getConnection()
  const Employee = await getEmployeeModel(dbConnection)

  const {
    name,
    surname,
    address,
    phone,
    nif,
    weekHours,
    active,
    closed
  } = req.body

  await Employee.findByIdAndUpdate(req.params.id, {
    $set: {
      name,
      surname,
      address,
      phone,
      nif,
      weekHours,
      active,
      closed
    }
  })
    .then(updatedEmployee => res.status(200).json(updatedEmployee))
    .catch(err => next(err))
})

module.exports = employeesRouter
