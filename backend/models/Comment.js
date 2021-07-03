const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      default: '',
      required: true,
    },
    displayName: {
      type: String,
      default: '',
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Comment', CommentSchema)
