const express = require('express')
const router = express.Router()
const path = require('path')
// const initializer = require('../scripts')

/* GET home page. */
router.get('/init', function(req, res, next) {
  res.send('nothing...')
})

module.exports = router
