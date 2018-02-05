const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const { Book, Author } = require('../models')
const config = require('../config')

router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

router.get('/books', function (req, res, next) {

  let page = req.query.page ? req.query.page : 1

  let resData = {
    page: Number(page),
    limit: 40,
    offset: 40 * (page - 1),
    count: null,
    books: []
  }

  Book
    .count()
    .then(data => {
      resData.count = data

      return Book
        .find(null, null, { limit: resData.limit, skip: resData.offset })
        .populate('author')
    })
    .then(books => {
      resData.books = books
      res.status(200).json(resData)
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

router.get('/book/:uuid', function (req, res, next) {
  Book.findOne({ uuid: req.params.uuid })
    .populate('author')
    .then(book => {
      fs.readdir(path.join(config.dir.small, req.params.uuid), (err, files) => {
        if (err) {
          next(err)
        } else {
          let pages = _.filter(files, file => {
            return /\.(jpg|png)$/.test(file)
          })
          res.status(200).json(pages)
        }
      })
    })
    .catch(err => {
      next(err)
    })
})

router.post('/book/:id', function (req, res, next) {
  Book.findOneAndUpdate({
    _id: req.params.id
  }, req.body)
    .then(book => {
      res.status(200).json(book)
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

router.get('/authors', function(req, res, next) {
  Author.find()
    .then(authors => {
      res.status(200).json(authors)
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

module.exports = router
