const mongoose = require('mongoose')
const { Schema, model} = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  band: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Band",
    
  },
  Venue: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Venue",
    
  },
})

const User = model('User', userSchema)

module.exports = User