const { Schema, model } = require('mongoose')

const empoloyeeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  surname: {
    type: String,
    required: [true, 'surname is required']
  },
  address: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    default: null
  },
  nif: {
    type: String,
    unique: true,
    required: [true, 'nif is required']
  },
  weekHours: {
    type: Number,
    default: 40
  },
  active: {
    type: Boolean,
    default: true
  },
  signings: [{
    type: Schema.Types.ObjectId,
    ref: 'Signing'
  }],
  closed: {
    type: Boolean,
    default: false
  }
})

empoloyeeSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Employee = model('Employee', empoloyeeSchema)

module.exports = Employee
