const actionsRouter = require('express').Router()
const authorization = require('../middleware/authorization')
const getActionModel = require('../services/getActionModel')
const getLocationModel = require('../services/getLocationModel')
const { getConnection } = require('../middleware/connectionResolver')

actionsRouter.get('/', async (_, res) => {
  const dbConnection = await getConnection()
  const Action = await getActionModel(dbConnection)

  Action.find({})
    .then(actions => res.status(200).json(actions))
})

actionsRouter.get('/:id', async (req, res, next) => {
  const dbConnection = await getConnection()
  const Action = await getActionModel(dbConnection)

  Action.findById(req.params.id)
    .then(action => {
      action
        ? res.status(200).json(action)
        : res.status(404).end()
    })
    .catch(err => next(err))
})

actionsRouter.post('/', authorization, async (req, res, next) => {
  const dbConnection = await getConnection()
  const Action = await getActionModel(dbConnection)
  const Location = await getLocationModel(dbConnection)

  const {
    startDate,
    endDate,
    hour,
    duration,
    recurrance,
    recurranceDays,
    employees,
    active,
    alarm,
    locationId
  } = req.body

  const location = await Location.findById(locationId) || null

  await new Action({
    startDate,
    endDate,
    hour,
    duration,
    recurrance,
    recurranceDays,
    employees,
    location: location._id,
    active,
    alarm
  }).save()
    .then(savedAction => {
      if (location) {
        location.actions = location.actions.concat(savedAction._id)
        location.save()
      }

      res.status(201).json(savedAction)
    })
    .catch(err => next(err))
})

actionsRouter.put('/:id', authorization, async (req, res, next) => {
  const dbConnection = await getConnection()
  const Action = await getActionModel(dbConnection)

  const {
    startDate,
    endDate,
    hour,
    duration,
    recurrance,
    recurranceDays,
    employees,
    active,
    alarm,
    closed
  } = req.body

  await Action.findByIdAndUpdate(req.params.id, {
    $set: {
      startDate,
      endDate,
      hour,
      duration,
      recurrance,
      recurranceDays,
      employees,
      active,
      alarm,
      closed
    }
  })
    .then(updatedAction => res.status(200).json(updatedAction))
    .catch(err => next(err))
})

module.exports = actionsRouter
