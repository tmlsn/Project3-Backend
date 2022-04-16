const mongoose = require('mongoose')
const { Schema, model} = mongoose;

const artistSchema = new Schema({
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  style: {
    type: String,
    required: true,
  },
  members: [
      {
          name: {
              type: String,
              required: true,
          },
          singer: {
              type: Boolean,
              required: true,
          },
          instrument: {
              type: String,
              required: true,
          },
      }
  ],
  location: {
    type: String,
    required: true,
  },
})

const Artist = model('Artist', artistSchema)

module.exports = Artist