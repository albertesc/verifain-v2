const { Schema, model } = require('mongoose')

const clientSchema = new Schema({
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
  phone: {
    type: String,
    default: null
  },
  email: {
    type: String,
    default: null
  },
  web: {
    type: String,
    default: null
  },
  contactName: {
    type: String,
    default: null
  },
  active: {
    type: Boolean,
    default: true
  },
  locations: [{
    type: Schema.Types.ObjectId,
    ref: 'Location',
    default: null
  }],
  closed: {
    type: Boolean,
    default: false
  }
})

clientSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Client = model('Client', clientSchema)

module.exports = Client
