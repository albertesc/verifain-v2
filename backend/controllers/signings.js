const signingsRouter = require('express').Router()
const authorization = require('../middleware/authorization')
const getSigningModel = require('../services/getSigningModel')
const getEmployeeModel = require('../services/getEmployeeModel')
const getActionModel = require('../services/getActionModel')
const getLocationModel = require('../services/getLocationModel')
const { getConnection } = require('../middleware/connectionResolver')

signingsRouter.get('/', async (_, res) => {
  const dbConnection = await getConnection()
  const Signing = await getSigningModel(dbConnection)
  await getEmployeeModel(dbConnection)
  await getActionModel(dbConnection)
  await getLocationModel(dbConnection)

  Signing.find({})
    .populate('employee', 'name surname')
    .populate('action', 'startDate endDate hour duration')
    .populate('location', 'name')
    .then(signings => res.status(200).json(signings))
})

signingsRouter.get('/:id', async (req, res, next) => {
  const dbConnection = await getConnection()
  const Signing = await getSigningModel(dbConnection)
  await getEmployeeModel(dbConnection)
  await getActionModel(dbConnection)
  await getLocationModel(dbConnection)

  Signing.findById(req.params.id)
    .populate('employee', 'name surname')
    .populate('action', 'startDate endDate hour duration')
    .populate('location', 'name')
    .then(signing => {
      signing
        ? res.status(200).json(signing)
        : res.status(404).end()
    })
    .catch(err => next(err))
})

signingsRouter.post('/', authorization, async (req, res, next) => {
  const dbConnection = await getConnection()
  const Signing = await getSigningModel(dbConnection)
  const Employee = await getEmployeeModel(dbConnection)
  const Action = await getActionModel(dbConnection)
  const Location = await getLocationModel(dbConnection)

  const { signingInType, signingIn, employeeId, coordinatesIn, actionId, locationId } = req.body

  const employee = await Employee.findById(employeeId) || null
  const action = await Action.findById(actionId) || null
  const location = await Location.findById(locationId) || null

  await new Signing({
    signingInType,
    signingIn,
    coordinatesIn,
    action: actionId,
    employee: employeeId,
    location: locationId
  }).save()
    .then(savedSigning => {
      employee && employee.signings.push(savedSigning._id) && employee.save()
      action
        ? (action.signings.push(savedSigning._id) && action.save())
        : new Action({
          startDate: new Date().setHours(0, 0, 0, 0),
          endDate: new Date().setHours(0, 0, 0, 0),
          employees: [employeeId],
          location: locationId,
          signings: [savedSigning._id],
          notProgrammed: true,
          recurrance: 'DAILY'
        }).save()
      location && location.signings.push(savedSigning._id) && location.save()

      res.status(201).json(savedSigning)
    })
    .catch(err => { console.log(err); next(err) })
})

signingsRouter.put('/:id', authorization, async (req, res, next) => {
  const dbConnection = await getConnection()
  const Signing = await getSigningModel(dbConnection)

  const { signingOutType, signingOut, coordinatesOut } = req.body

  Signing.findByIdAndUpdate(req.params.id, {
    $set: {
      signingOutType,
      signingOut,
      coordinatesOut
    }
  }).then(updatedSigning => res.status(200).json(updatedSigning))
    .catch(err => next(err))
})

signingsRouter.delete('/:id', authorization, async (req, res, next) => {
  const dbConnection = await getConnection()
  const Signing = await getSigningModel(dbConnection)

  Signing.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => next(err))
})

module.exports = signingsRouter
