const { Schema, model } = require('mongoose')

const locationSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  address: {
    type: String,
    required: [true, 'address is required']
  },
  city: {
    type: String,
    required: [true, 'city is required']
  },
  province: {
    type: String,
    default: null
  },
  country: {
    type: String,
    default: null
  },
  coordinates: {
    type: String
  },
  label: {
    type: Schema.Types.ObjectId,
    ref: 'Label',
    default: null
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: [true, 'client is required']
  },
  actions: [{
    type: Schema.Types.ObjectId,
    ref: 'Action',
    default: null
  }],
  signings: [{
    type: Schema.Types.ObjectId,
    ref: 'Signing',
    default: null
  }],
  closed: {
    type: Boolean,
    default: false
  }
})

locationSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Location = model('Location', locationSchema)

module.exports = Location
