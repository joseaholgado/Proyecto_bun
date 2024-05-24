import mongoose from 'mongoose'

const event_schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

const Event = mongoose.model('Event', event_schema)

export default Event
