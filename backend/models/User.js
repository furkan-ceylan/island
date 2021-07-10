const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      max: 75,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    displayName: {
      type: String,
      default: '',
    },
    profilePicture: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    birthDate: {
      type: String,
      default: '',
    },
    hobbies: {
      type: String,
      default: '',
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)
