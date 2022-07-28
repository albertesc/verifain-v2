const { Schema, model } = require('mongoose')

const signingSchema = new Schema({
  signingInType: {
    type: String,
    enum: {
      values: ['QR', 'MANUAL'],
      message: '{VALUE} no es un tipo de salida válido'
    },
    required: [true, 'signingInType is required']
  },
  signingOutType: {
    type: String,
    enum: {
      values: ['QR', 'MANUAL', null],
      message: '{VALUE} no es un tipo de salida válido'
    },
    default: null
  },
  signingIn: {
    type: Date,
    required: [true, 'signingIn is required']
  },
  signingOut: {
    type: Date,
    default: null
  },
  coordinatesIn: {
    type: String,
    default: null
  },
  coordinatesOut: {
    type: String,
    default: null
  },
  action: {
    type: Schema.Types.ObjectId,
    ref: 'Action',
    default: null
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
    default: null
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: [true, 'employee is required']
  },
  modified: {
    type: Boolean,
    default: false
  }
})

signingSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Signing = model('Signing', signingSchema)

module.exports = Signing
