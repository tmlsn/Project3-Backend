const mongoose = require('mongoose')
const { Schema, model} = mongoose;

const venueSchema = new Schema({
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  style: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
})

const Venue = model('Venue', userSchema)

module.exports = Venue