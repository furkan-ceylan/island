const router = require('express').Router()
const User = require('../models/User.js')
const bcrypt = require('bcrypt')

//REGISTER
router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
      email: req.body.email,
      password: hashedPass,
    })

    const user = await newUser.save()
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

//LOGIN
router.post('/login', async (req, res) => {
  try {
    const userLogin = await User.findOne({
      email: req.body.email,
    })
    !userLogin && res.status(404).json('User not found')

    const validPassword = await bcrypt.compare(
      req.body.password,
      userLogin.password
    )
    !validPassword && res.status(400).json('Wrong password')

    res.status(200).json(userLogin)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
