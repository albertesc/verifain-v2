const jwt = require('jsonwebtoken')

const authorization = (req, res, next) => {
  const token = req.get('authorization')

  if (token && token.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(token.substring(7), process.env.SECRET)
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    req.account = decodedToken
  } else {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  next()
}

module.exports = authorization
