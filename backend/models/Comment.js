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
    },
    displayName: {
      type: String,
      default: '',
      required: true,
    },
    isTextComment: {
      type: Boolean,
      default: false,
    },
    file: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Comment', CommentSchema)
