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
  description: {
    type: String,
    required: false,
  },
  contactInfo: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
})

const Venue = model('Venue', venueSchema)

module.exports = Venue