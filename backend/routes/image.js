const path = require('path')
const express = require('express')
const router = express.Router()
const config = require('../config')
const cel = require('connect-ensure-login')

function isAuth (req, res, next) {
  if (!cel.ensureLoggedIn()) {
    res.status(403).end({ error: 'Not Authenticated.' })
  } else {
    next()
  }
}

router.get('/', isAuth, function(req, res, next) {
  res.send('respond with a resource')
})

router.use('/thumbnail', isAuth, express.static(config.dir.thumbnail))
router.get('/small', isAuth, express.static(config.dir.small))
router.get('/big', isAuth, express.static(config.dir.big))

module.exports = router
