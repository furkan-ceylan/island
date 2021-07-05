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

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    })

    res.status(200).json({
      title: 'login success',
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/user', async (req, res) => {
  try {
    const cookie = req.cookies['jwt']
    const claims = jwt.verify(cookie, process.env.SECRET_KEY)

    if (!claims) {
      res.status(401).send({
        error: 'unauthenticated',
      })
    }

    const user = await User.findOne({ id: claims.id })
    const { password, ...data } = await user.toJSON()

    res.send(data)
  } catch (err) {
    res.status(401).send({
      error: 'unauthenticated',
    })
  }
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
