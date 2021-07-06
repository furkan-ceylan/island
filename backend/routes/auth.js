const router = require('express').Router()
const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//REGISTER
router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
      email: req.body.email,
      password: hashedPass,
      displayName: req.body.displayName,
      profilePicture: req.body.profilePicture,
      description: req.body.description,
      birthDate: req.body.birthDate,
      hobbies: req.body.hobbies,
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

    const token = jwt.sign({ userId: userLogin._id }, process.env.SECRET_KEY)

    res.status(200).json({ user: userLogin, token: token })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/user', async (req, res) => {
  let token = req.headers.token

  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) {
      res.status(401).json({
        title: 'unauthorized',
      })
    }

    await User.findOne({ _id: decoded.userId }, (err, user) => {
      if (err) return console.log(err)
      return res.status(200).json({
        title: 'user grabbed',
        user: user,
      })
    })
  })
})

router.post('/logout', async (req, res) => {
  res.cookie('jwt', '', {
    maxAge: 0,
  })

  res.send({
    message: 'logout success',
  })
})

module.exports = router
