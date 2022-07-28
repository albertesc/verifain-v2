const ERROR_HANDLERS = {
  TypeError: res => res.status(400).json({ error: 'Bad Data' }),
  CastError: res => res.status(400).json({ error: 'Bad Data' }),
  ValidationError: (res, { message }) => res.status(409).json({ error: message }),
  JsonWebTokenError: res => res.status(401).json({ error: 'Invalid Token' }),
  MongoServerError: res => res.status(500).json({ error: 'Duplicate key error collection' }),
  defaultError: res => res.status(500).end()
}

const handleErrors = (error, req, res, next) => {
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError
  handler(res, error)
}

module.exports = handleErrors
