const clientsRouter = require('express').Router()
const authorization = require('../middleware/authorization')
const getClientModel = require('../services/getClientModel')
const { getConnection } = require('../middleware/connectionResolver')

clientsRouter.get('/', async (_, res) => {
  const dbConnection = await getConnection()
  const Client = await getClientModel(dbConnection)

  Client.find({})
    .then(clients => res.status(200).json(clients))
})

clientsRouter.get('/:id', async (req, res, next) => {
  const dbConnection = await getConnection()
  const Client = await getClientModel(dbConnection)

  Client.findById(req.params.id)
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
