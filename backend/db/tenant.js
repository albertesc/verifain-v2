const mongoose = require('mongoose')

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open')
})

mongoose.connection.on('error', err => {
  console.log('Mongoose default connection error: ' + err)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected')
})

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination')
    process.exit(0)
  })
})

const initTenantDbConnection = DB_URI => {
  try {
    const db = mongoose.createConnection(DB_URI, {
      socketTimeoutMS: 30000,
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    return db
  } catch (error) {
    console.log('initTenantDbConnection error', error)
  }
}

module.exports = initTenantDbConnection
