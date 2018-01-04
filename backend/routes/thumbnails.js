const path = require('path')
const express = require('express')
const router = express.Router()
const config = require('../config')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource')
})

router.get('/:id', function (req, res, next) {
  res.sendFile(path.join('.thumbnails', req.params.id + '.jpg'), {
    root: config.baseDir,
    dotfiles: 'allow',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }, function (err) {
      if (err) next(err)
    }
  })
})

module.exports = router
