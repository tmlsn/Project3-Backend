const mongoose = require('mongoose')
const { Schema, model} = mongoose;

const venueSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  Style: {
    type: String,
    required: true,
  },
  Schedule: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
})

const Venue = model('User', userSchema)

module.exports = Venue