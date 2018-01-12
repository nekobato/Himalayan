const express = require('express')
const router = express.Router()
const path = require('path')
const initializer = require('../initializer')

/* GET home page. */
router.get('/init', function(req, res, next) {
  if (initializer.isInitializing) {
    res.status(200).send({ error: true, type: "IS_INITIALIZING", message: "現在初期化中です" })
  }
  res.status(200).send({ error: null, data: {  } })
  initializer.init()
    .then(data => {
    })
    .catch(err => {
      console.error(err)
    })
})

module.exports = router
