const path = require('path')
const express = require('express')
const router = express.Router()
const config = require('../config')
const cel = require('connect-ensure-login')

const sendFileOption = function (next) {
  return {
    dotfiles: 'deny',
    headers: { 'x-sent': true },
    function (err) {
      if (err) next(err)
    }
  }
}

/* GET users listing. */
router.get('/', function (req, res, next) {
  if (!cel.ensureLoggedIn()) return res.status(403).send({ error: 'Not Authenticated.' })
  res.send('respond with a resource')
})

router.get('/thumbnail/:book_uuid', function (req, res, next) {
  if (!cel.ensureLoggedIn()) return res.status(403).send({ error: 'Not Authenticated.' })
  res.type('jpg').sendFile(path.join(config.dir.thumbnail, req.params.book_uuid), sendFileOption(next))
})

router.get('/small/:book_uuid/:num', function (req, res, next) {
  if (!cel.ensureLoggedIn()) return res.status(403).send({ error: 'Not Authenticated.' })
  res.type('jpg').sendFile(path.join(config.dir.small, req.params.book_uuid, req.params.num), sendFileOption(next))
})

router.get('/big/:book_uuid/:num', function (req, res, next) {
  if (!cel.ensureLoggedIn()) return res.status(403).send({ error: 'Not Authenticated.' })
  res.type('jpg').sendFile(path.join(config.dir.big, req.params.book_uuid, req.params.num), sendFileOption(next))
})

module.exports = router
