const router = require('express').Router()
const User = require('../models/User.js')
const sanitize = require('mongo-sanitize')

//GET ALL USERS
router.get('/', async (req, res) => {
  try {
    const getUsers = await User.find() //find all
    return res.status(200).json(getUsers)
  } catch (err) {
    return res.status(500).json(err)
  }
})

//GET USER
router.get('/:userId', async (req, res) => {
  try {
    const getUser = await User.findById(req.params.userId) //findById by params
    const { password, updatedAt, ...other } = getUser._doc //do not show password and upadtedAt datas
    return res.status(200).json(other)
  } catch (err) {
    return res.status(500).json(err)
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
        return res.status(200).json('user has been followed')
      } else {
        return res.status(403).json('you already follow this user')
      }
    } catch (err) {
      return res.status(500).json(err)
    }
  } else {
    return res.status(403).json('you cant follow yourself')
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
        return res.status(200).json('user has been unfollowed')
      } else {
        return res.status(403).json('you dont follow this user')
      }
    } catch (err) {
      return res.status(500).json(err)
    }
  } else {
    return res.status(403).json('you cant unfollow yourself')
  }
})

//UPDATE A USER
router.put('/:id/edit', async (req, res) => {
  try {
    const sanitizedDisplayName = sanitize(req.sanitize(req.body.displayName))
    const sanitizedDesc = sanitize(req.sanitize(req.body.description))
    const sanitizedBirthDate = sanitize(req.sanitize(req.body.birthDate))
    const sanitizedHobbies = sanitize(req.sanitize(req.body.hobbies))
    const sanitizedProfilePicture = sanitize(
      req.sanitize(req.body.profilePicture)
    )

    const getUser = await User.findById(req.params.id)

    await getUser.updateOne({
      $set: {
        displayName: sanitizedDisplayName,
        description: sanitizedDesc,
        birthDate: sanitizedBirthDate,
        hobbies: sanitizedHobbies,
        profilePicture: sanitizedProfilePicture,
      },
    })
    return res.status(200).json({ msg: 'user has been updated' })
  } catch (err) {
    return res.status(500).json(err)
  }
})

module.exports = router
