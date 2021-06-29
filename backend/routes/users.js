const router = require('express').Router()
const User = require('../models/User.js')

//GET USER
router.get('/:userId', async (req, res) => {
  try {
    const getUser = await User.findById(req.params.userId) //findById by params
    const { password, updatedAt, ...other } = getUser._doc //do not show password and upadtedAt datas
    res.status(200).json(other)
  } catch (err) {
    res.status(500).json(err)
  }
})

//GET FRIENDS
router.get('/:userId/friends', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId) //create an array for followings
      })
    )
    let friendList = []
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend //just show username and profilepicture
      friendList.push({ _id, username, profilePicture })
    })
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err)
  }
})

//FOLLOW A USER
router.put('/:id/follow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } }) //add current user to user's followers
        await currentUser.updateOne({ $push: { followings: req.params.id } }) //add user to current user's followings
        res.status(200).json('user has been followed')
      } else {
        res.status(403).json('you allready follow this user')
      }
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(403).json('you cant follow yourself')
  }
})

//UNFOLLOW A USER
router.put('/:id/unfollow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } }) //delete current user from user's followers
        await currentUser.updateOne({ $pull: { followings: req.params.id } }) //delete user from current user's followings
        res.status(200).json('user has been unfollowed')
      } else {
        res.status(403).json('you dont follow this user')
      }
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(403).json('you cant unfollow yourself')
  }
})

module.exports = router
