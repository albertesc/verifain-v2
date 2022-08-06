const locationsRouter = require('express').Router()
const authorization = require('../middleware/authorization')
const getLocationModel = require('../services/getLocationModel')
const getClientModel = require('../services/getClientModel')
const getActionModel = require('../services/getActionModel')
const getSigningModel = require('../services/getSigningModel')
const { getConnection } = require('../middleware/connectionResolver')

locationsRouter.get('/', async (_, res) => {
  const dbConnection = await getConnection()
  const Location = await getLocationModel(dbConnection)
  await getClientModel(dbConnection)
  await getActionModel(dbConnection)
  await getSigningModel(dbConnection)

  Location.find({})
    .populate('client', 'name')
    .populate('signings', 'signingIn signingOut')
    .populate('actions', 'startDate endDate hour duration')
    .then(locations => res.status(200).json(locations))
})

locationsRouter.get('/:id', async (req, res, next) => {
  const dbConnection = await getConnection()
  const Location = await getLocationModel(dbConnection)
  await getClientModel(dbConnection)
  await getActionModel(dbConnection)
  await getSigningModel(dbConnection)

  Location.findById(req.params.id)
    .populate('client', 'name')
    .populate('signings', 'signingIn signingOut')
    .populate('actions', 'startDate endDate hour duration')
    .then(location => {
      location
        ? res.status(200).json(location)
        : res.status(404).end()
    })
    .catch(err => next(err))
})

locationsRouter.post('/', authorization, async (req, res, next) => {
  const dbConnection = await getConnection()
  const Location = await getLocationModel(dbConnection)
  const Client = await getClientModel(dbConnection)

  const {
    name,
    address,
    city,
    province,
    country,
    coordinates,
    label,
    clientId
  } = req.body

  const client = await Client.findById(clientId)

  await new Location({
    name,
    address,
    city,
    province,
    country,
    coordinates,
    label,
    client: client._id
  }).save()
    .then(savedLocation => {
      if (client) {
        client.locations = client.locations.concat(savedLocation._id)
        client.save()
      }

      res.status(201).json(savedLocation)
    })
    .catch(err => next(err))
})

module.exports = locationsRouter
