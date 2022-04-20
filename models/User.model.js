const mongoose = require('mongoose')
const { Schema, model} = mongoose;

const userSchema = new Schema({
  profilePicture: {
    type: String,
    default: 'https://www.cregybad.org/wp-content/uploads/2017/10/user.png',
  },
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
  artist: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Artist",
    
  },
  Venue: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Venue",
    
  },
})

const User = model('User', userSchema)

module.exports = User