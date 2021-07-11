const router = require('express').Router()
const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const xoauth2 = require('xoauth2')

// const generator = xoauth2.createXOAuth2Generator({
//   user: 'ceylan.furkan100@gmail.com',
//   clientId:
//     '1040856511849-hluqsqh4ern4ljpithisjj4i536bd9ja.apps.googleusercontent.com',
//   clientSecret: 'v2z4G55N8kiN9SJoPMBmJWLu',
//   refreshToken:
//     '1//04zETUne01X74CgYIARAAGAQSNwF-L9IrmSGTHIcF1h0zfpv_azkOFJKCLBjg8hmdMUVEx106G_70RJbHYuXUjLIITgXKtQAJ2rE',
//   accessToken:
//     'ya29.a0ARrdaM-3kD9APS1pzCVsJ7oScIMkF4ECgFQTgR5EHb0p8MEIRUQKUfRUOPGtrkvzjJAtSGPb5f4G5aso240DKTe7rLG5D6TNFl5fhWwvOL6zUaCVFUuJy3v-n4aI4-lY0L5YsqsjDjwX4Qn_ebWL0TTyPSEc',
// })

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     xoauth2: generator,
//   },
// })

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.AUTH_USER,
    clientId: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    refreshToken: process.env.AUTH_REFRESH_TOKEN,
    accessToken: process.env.AUTH_ACCESS_TOKEN,
  },
})

//REGISTER
router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
      email: req.body.email,
      password: hashedPass,
      displayName: req.body.displayName,
      profilePicture: req.body.file,
      description: req.body.description,
      birthDate: req.body.birthDate,
      hobbies: req.body.hobbies,
    })

    const user = await newUser.save()

    // async email
    jwt.sign(
      {
        userId: user._id,
      },
      process.env.EMAIL_SECRET,
      {
        expiresIn: '1d',
      },
      (err, emailToken) => {
        const url = `http://localhost:3000/api/auth/confirmation/${emailToken}`

        transporter.sendMail({
          from: 'Island <ceylan.furkan100@gmail.com>',
          to: user.email,
          subject: 'Confirm Email',
          html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
        })
      }
    )

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

//UPLOAD
router.post('/upload', (req, res) => {
  const file = req.files.file
  file.mv('uploads/user/' + file.name, function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log('uploaded')
    }
  })
  res.json({ file: req.body.file })
  console.log('file:' + req.body.file)
})

//LOGIN
router.post('/login', async (req, res) => {
  try {
    const userLogin = await User.findOne({
      email: req.body.email,
    })

    !userLogin && res.status(404).json({ error: 'User not found' })

    if (!userLogin.confirmed) {
      res.status(400).json({ error: 'Email not confirmed' })
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      userLogin.password
    )
    !validPassword && res.status(400).json({ error: 'Wrong password' })

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

router.get('/confirmation/:token', async (req, res) => {
  const decoded = jwt.decode(req.params.token, process.env.EMAIL_SECRET)
  await User.findOne({ _id: decoded.userId }).then((user) => {
    if (!user) {
      return res.status(401).json('Email confirmation failed')
    }

    user.confirmed = true
    user.save().then((user) => {
      res.send(user)
    })

    return res.redirect('http://localhost:8080/login')
  })
})

module.exports = router
