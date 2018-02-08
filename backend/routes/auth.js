const express = require('express')
const router = express.Router()
const _ = require('lodash')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { User, Book, Author } = require('../models')
const config = require('../config')

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }).then(user => {
      if (!user) { return done(null, false) }
      if (!user.verifyPassword(password)) { return done(null, false) }
      return done(null, user)
    }).catch(err => {
      return done(err)
    })
  }
))

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

router.post('/login', function(req, res, next) {
  if (!req.query.name || !req.query.password) {
    return res.status(200).send({
      error: 'NAME and PASSWORD Required.'
    })
  }

  passport.authenticate('local', passport.authenticate('local'), function (req, res) {
    res.type('json').send({
      user: req.user
    })
  })
})

router.post('/logout', function(req, res, next) {
  if (req.isAuthenticated()) {
    req.logout()
    res.type('json').send({
      error: null
    })
  } else {
    res.type('json').send({
      error: 'is not Authenticated.'
    })
  }
})

module.exports = router
