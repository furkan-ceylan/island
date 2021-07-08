const router = require('express').Router()
const Post = require('../models/Post.js')
const User = require('../models/User.js')
const Comment = require('../models/Comment.js')

//CREATE POST
router.post('/', async (req, res) => {
  const newPost = new Post(req.body)
  await newPost.updateOne({
    $push: {
      displayName: req.body.displayName,
      file: req.body.file,
    },
  })

  try {
    const createPost = await newPost.save()
    res.status(200).json({ createPost })
  } catch (err) {
    res.status(500).json(err)
  }
})

//UPLOAD
router.post('/upload', (req, res) => {
  const file = req.files.file
  file.mv('uploads/' + file.name, function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log('uploaded')
    }
  })
  res.json({ file: req.body.file })
  console.log('file:' + req.body.file)
})

//COMMENT POST
router.put('/:id/comment', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    const comment = new Comment(req.body)
    await comment.updateOne({
      $push: {
        userId: req.body.userId,
        postId: req.params.id,
        comment: req.body.comment,
        displayName: req.body.displayName,
        file: req.body.file,
      },
    })
    await post.updateOne({ $push: { comments: req.body } })
    const addComment = await comment.save()
    res.status(200).json(addComment)
  } catch (err) {
    res.status(500).json(err)
  }
})

//GET POSTS COMMENTS
router.get('/:id/comments', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    const comment = await Comment.find({ postId: post._id })
    res.status(200).json(comment)
  } catch (err) {
    res.status(500).json(err)
  }
})

//GET A POST
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json(err)
  }
})

//GET FRIENDS POSTS
router.get('/timeline/:userId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId)
    const userPosts = await Post.find({ userId: currentUser._id })
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId })
      })
    )
    res.json(userPosts.concat(...friendPosts))
  } catch (err) {
    res.status(500).json(err)
  }
})

//GET USER'S POSTS
router.get('/:userId/posts', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId)
    const userPosts = await Post.find({ userId: currentUser._id })

    res.status(200).json(userPosts)
  } catch (err) {
    res.status(500).json(err)
  }
})
module.exports = router
