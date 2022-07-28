const { Schema, model } = require('mongoose')

const labelSchema = new Schema({
  reference: {
    type: String,
    required: [true, 'reference is required'],
    unique: true
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
  }
})

labelSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Label = model('Label', labelSchema)

module.exports = Label
