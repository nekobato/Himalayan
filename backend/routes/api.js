const express = require('express')
const router = express.Router()
const path = require('path')
const { Book, Author } = require('../models')

router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

router.get('/books', function (req, res, next) {
  Book.find()
    .populate('author')
    .then(books => {
      res.status(200).json(books)
      next()
    })
    .catch(err => {
      res.status(500).send(err)
      next()
    })
})

router.post('/book/:id', function (req, res, next) {
  Book.findOneAndUpdate({
    _id: req.params.id
  }, req.body)
    .then(book => {
      res.status(200).json(book)
      next()
    })
    .catch(err => {
      res.status(500).send(err)
      next()
    })
})

router.get('/authors', function(req, res, next) {
  Author.find()
    .then(authors => {
      res.status(200).json(authors)
      next()
    })
    .catch(err => {
      res.status(500).send(err)
      next()
    })
})

module.exports = router
