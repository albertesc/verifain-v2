const labelsRouter = require('express').Router()
const getLabelModel = require('../services/getLabelModel')
const getLocationModel = require('../services/getLocationModel')
const { getConnection } = require('../middleware/connectionResolver')

labelsRouter.get('/', async (_, res) => {
  const dbConnection = await getConnection()
  const Label = await getLabelModel(dbConnection)

  Label.find({})
    .then(locations => res.status(200).json(locations))
})

labelsRouter.get('/:id', async (req, res, next) => {
  const dbConnection = await getConnection()
  const Label = await getLabelModel(dbConnection)

  Label.findById(req.params.id)
    .then(label => {
      label
        ? res.status(200).json(label)
        : res.status(404).end()
    })
    .catch(err => next(err))
})

labelsRouter.post('/', async (req, res, next) => {
  const dbConnection = await getConnection()
  const Label = await getLabelModel(dbConnection)
  const Location = await getLocationModel(dbConnection)

  const { reference, locationId } = req.body
  const location = await Location.findById(locationId)

  await new Label({
    reference,
    location: location._id
  }).save()
    .then(savedLabel => {
      if (location) {
        location.label = savedLabel._id
        location.save()
      }

      res.status(201).json(savedLabel)
    })
    .catch(err => next(err))
})

module.exports = labelsRouter
