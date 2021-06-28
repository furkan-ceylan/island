const router = require('express').Router()
const UserModal = require('../models/User.js')
const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)

    const newUser = new UserModal({
      email: req.body.email,
      password: hashedPass,
    })

    const user = await newUser.save()
    res.status(200).json(user)
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
