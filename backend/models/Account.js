const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const validRoles = {
  values: ['ADMIN', 'USER'],
  message: '{VALUE} no es un role válido'
}
const validTypes = {
  values: ['LITE', 'BASIC', 'PREMIUM'],
  message: '{VALUE} no es un role válido'
}

const accountSchema = new Schema({
  accountName: {
    type: String,
    required: [true, 'accountName is required']
  },
  accountRef: {
    type: String,
    required: [true, 'accountRef is required'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true
  },
  passwordHash: {
    type: String,
    required: [true, 'password is required']
  },
  companyName: {
    type: String,
    default: null
  },
  profilePhoto: {
    type: String,
    default: null
  },
  accountType: {
    type: String,
    default: 'LITE',
    enum: validTypes
  },
  role: {
    type: String,
    required: [true],
    default: 'USER',
    enum: validRoles
  }
})

accountSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

accountSchema.plugin(uniqueValidator)

const Account = model('Account', accountSchema)

module.exports = Account
