const mongoose = require('mongoose')
const { Schema, model} = mongoose;

const bandSchema = new Schema({
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
  Members: [
      {
          Name: {
              type: String,
              required: true,
          },
          Singer: {
              type: Boolean,
              required: true,
          },
          Instrument: {
              type: String,
              required: true,
          },
      }
  ],
  Location: {
    type: String,
    required: true,
  },
})

const Band = model('User', userSchema)

module.exports = Band