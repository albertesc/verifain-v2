const { getConnection } = require('../middleware/connectionResolver')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const getAccountModel = require('../services/getAccountModel')

loginRouter.post('/', async (req, res, next) => {
  const dbConnection = getConnection()
  const Account = await getAccountModel(dbConnection)

  const { email, password } = req.body

  Account.findOne({ email })
    .then(account => {
      if (account && bcrypt.compareSync(password, account.passwordHash)) {
        const { id, companyName, accountRef, email, role } = account

        const accountForToken = { id, email, accountRef }
        const token = jwt.sign(accountForToken, process.env.SECRET)

        res.status(200).json({
          companyName,
          accountRef,
          role,
          token
        })
      } else {
        res.status(401).json({ error: 'invalid credentials' })
      }
    })
    .catch(err => next(err))
})

module.exports = loginRouter
