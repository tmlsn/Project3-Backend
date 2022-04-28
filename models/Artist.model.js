const mongoose = require('mongoose')
const { Schema, model} = mongoose;

const artistSchema = new Schema({
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  style: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  contactInfo: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
})

const Artist = model('Artist', artistSchema)

module.exports = Artist