const path = require('path')
const express = require('express')
const router = express.Router()
const config = require('../config')
const cel = require('connect-ensure-login')

const sendFileOption = {
  dotfiles: 'deny',
  headers: { 'x-sent': true }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (!cel.ensureLoggedIn()) {
    return res.status(403).send({ error: 'Not Authenticated.' })
  }
  res.send('respond with a resource')
})

router.get('/thumbnail/:book_uuid', function(req, res, next) {
  if (!cel.ensureLoggedIn()) {
    return res.status(403).send({ error: 'Not Authenticated.' })
  }
  res
    .type('jpg')
    .sendFile(
      path.join(config.dir.thumbnail, req.params.book_uuid),
      sendFileOption,
      (err) => {
        if (err) {
          next(err)
        }
      }
    )
})

router.get('/small/:book_uuid/:num', function(req, res, next) {
  if (!cel.ensureLoggedIn()) {
    return res.status(403).send({ error: 'Not Authenticated.' })
  }
  res
    .type('jpg')
    .sendFile(
      path.join(config.dir.small, req.params.book_uuid, req.params.num),
      sendFileOption,
      (err) => {
        if (err) {
          next(err)
        }
      }
    )
})

router.get('/big/:book_uuid/:num', function(req, res, next) {
  if (!cel.ensureLoggedIn()) {
    return res.status(403).send({ error: 'Not Authenticated.' })
  }
  console.log(path.join(config.dir.big, req.params.book_uuid, req.params.num))
  res
    .type('jpg')
    .sendFile(
      path.join(config.dir.big, req.params.book_uuid, req.params.num) + '.jpg',
      sendFileOption,
      (err) => {
        if (err) {
          next(err)
        }
      }
    )
})

module.exports = router
