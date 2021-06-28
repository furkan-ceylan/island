const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
      default: '',
    },
    img: {
      type: String,
      default: '',
    },
    likes: {
      type: Array,
      default: [],
    },
    isTextPost: {
      type: Boolean,
      default: false,
    },
    isImagePost: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Post', PostSchema)