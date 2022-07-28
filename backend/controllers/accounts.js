const bcrypt = require('bcrypt')
const accountsRouter = require('express').Router()
const mongoose = require('mongoose')
const getAccountModel = require('../services/getAccountModel')
const { getConnection } = require('../middleware/connectionResolver')

accountsRouter.get('/', async (_, res) => {
  const dbConnection = await getConnection()
  const Account = await getAccountModel(dbConnection)

  Account.find({}).then(accounts => res.status(200).json(accounts))
})

accountsRouter.get('/:id', async (req, res, next) => {
  const dbConnection = await getConnection()
  const Account = await getAccountModel(dbConnection)

  Account.findById(req.params.id)
    .then(account => {
      account
        ? res.status(200).json(account)
        : res.status(404).end()
    })
    .catch(err => next(err))
})

accountsRouter.post('/', async (req, res, next) => {
  const dbConnection = await getConnection()
  const Account = await getAccountModel(dbConnection)

  const { accountName, accountRef, email, password, companyName } = req.body
  const passwordHash = await bcrypt.hashSync(password, 10)

  await new Account({
    accountName,
    accountRef,
    email,
    passwordHash,
    companyName
  }).save()
    .then(savedAccount => res.status(201).json(savedAccount))
    .catch(err => next(err))
})

accountsRouter.put('/:id', async (req, res, next) => {
  const dbConnection = await getConnection()
  const Account = await getAccountModel(dbConnection)

  const {
    accountName,
    accountRef,
    email,
    password,
    companyName,
    profilePhoto,
    accountType,
    role
  } = req.body
  const passwordHash = bcrypt.hashSync(password, 10)

  Account.findByIdAndUpdate(req.params.id, {
    $set: {
      accountName,
      accountRef,
      email,
      passwordHash,
      companyName,
      profilePhoto,
      accountType,
      role
    }
  }).then(updatedAccount => res.status(200).json(updatedAccount))
    .catch(err => next(err))
})

accountsRouter.delete('/:id', async (req, res, next) => {
  const dbConnection = await getConnection()
  const Account = await getAccountModel(dbConnection)

  Account.findById(req.params.id)
    .then(async account => {
      const tenant = account.accountRef
      const conn = mongoose.createConnection(`${process.env.BASE_DB_URI}/${tenant}`)
      await conn.dropDatabase()
    })

  Account.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => next(err))
})

module.exports = accountsRouter
