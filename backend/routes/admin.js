const express = require('express')
const router = express.Router()
const path = require('path')
const { User } = require('../models')

router.get('/init', function(req, res, next) {
  res.send('nothing...')
})

router.post('/adduser', function(req, res, next) {
  User.create({
    name: req.body.username,
    password: req.body.password
  }).then(user => {
    res.send(user)
  }).catch(err => {
    next(err)
  })
})

module.exports = router
