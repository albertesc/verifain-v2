const clientsRouter = require('express').Router()
const authorization = require('../middleware/authorization')
const getClientModel = require('../services/getClientModel')
const { getConnection } = require('../middleware/connectionResolver')
const getLocationModel = require('../services/getLocationModel')

clientsRouter.get('/', async (_, res) => {
  const dbConnection = await getConnection()
  const Client = await getClientModel(dbConnection)
  await getLocationModel(dbConnection)

  Client.find({})
    .populate('locations', 'name')
    .then(clients => res.status(200).json(clients))
})

clientsRouter.get('/:id', async (req, res, next) => {
  const dbConnection = await getConnection()
  const Client = await getClientModel(dbConnection)
  await getLocationModel(dbConnection)

  Client.findById(req.params.id)
    .populate('locations', 'name')
    .then(client => {
      client
        ? res.status(200).json(client)
        : res.status(404).end()
    })
    .catch(err => { console.log(err); next(err) })
})

clientsRouter.post('/', authorization, async (req, res, next) => {
  const dbConnection = await getConnection()
  const Client = await getClientModel(dbConnection)

  const {
    name,
    address,
    city,
    province,
    country,
    phone,
    email,
    web,
    contactName,
    active
  } = req.body

  await new Client({
    name,
    address,
    city,
    province,
    country,
    phone,
    email,
    web,
    contactName,
    active
  }).save()
    .then(savedClient => res.status(201).json(savedClient))
    .catch(err => next(err))
})

module.exports = clientsRouter
