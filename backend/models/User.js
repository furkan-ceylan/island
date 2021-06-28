const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
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
      type: Array,
      default: [],
    },
    followers: {
      type: Number,
      default: 0,
    },
    followee: {
      type: Number,
      default: 0,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

model.export = mongoose.model('User', UserSchema)
