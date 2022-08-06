const { Schema, model } = require('mongoose')

const validRecurrance = {
  values: [
    'DAILY',
    'WEEKLY',
    'BIWEEKLY',
    'MONTHLY',
    null
  ],
  message: '{VALUE} is not valid recurrance'
}

const validRecurranceDays = {
  values: [
    'EVERY_MONDAY',
    'EVERY_WEDNESDAY',
    'EVERY_THURSDAY',
    'EVERY_FRIDAY',
    'EVERY_SATURDAY',
    'EVERY_SUNDAY',
    null
  ],
  message: '{VALUE} is not valid recurranceDays'
}

const actionSchema = new Schema({
  startDate: {
    type: Date,
    required: [true, 'startDate is required']
  },
  endDate: {
    type: Date,
    default: null
  },
  hour: {
    type: String,
    default: '00:00',
    validate: {
      validator: function (v) {
        return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v)
      }
    }
  },
  duration: {
    type: String,
    required: [true, 'duration is required'],
    default: '00:00',
    validate: {
      validator: function (v) {
        return /^\d+:\d{2}$/.test(v)
      }
    }
  },
  recurrance: {
    type: String,
    enum: validRecurrance,
    default: null
  },
  recurranceDays: [{
    type: String,
    enum: validRecurranceDays,
    default: null
  }],
  notProgrammed: {
    type: Boolean,
    default: false
  },
  employees: [{
    type: Schema.Types.ObjectId,
    ref: 'Employee'
  }],
  signings: [{
    type: Schema.Types.ObjectId,
    ref: 'Signing'
  }],
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
    default: null
  },
  active: {
    type: Boolean,
    default: true
  },
  alarm: {
    type: Boolean,
    default: false
  },
  closed: {
    type: Boolean,
    default: false
  }
})

actionSchema.set('toJSON', {
  transform: (req, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Action = model('Action', actionSchema)

module.exports = Action
