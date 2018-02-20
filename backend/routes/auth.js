const express = require('express')
const router = express.Router()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { User } = require('../models')
const cel = require('connect-ensure-login')

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username })
      .then(user => {
        if (!user) {
          return done(null, false)
        }
        if (!user.verifyPassword(password)) {
          return done(null, false)
        }
        return done(null, user)
      })
      .catch(err => {
        return done(err)
      })
  })
)

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) return done(err)
    done(null, user)
  })
})

router.post('/login', passport.authenticate('local'),
  function (req, res, next) {
    res.send({
      user: {
        username: req.user.username
      }
    })
  })

router.post('/logout', function (req, res, next) {
  if (cel.ensureLoggedIn()) {
    req.logout()
    res.send({})
  } else {
    res.send({
      error: 'is not Authenticated.'
    })
  }
})

router.get('/status', function (req, res, next) {
  if (cel.ensureLoggedIn()) {
    res.send({
      status: true
    })
  } else {
    res.send({
      status: false
    })
  }
})

module.exports = router
