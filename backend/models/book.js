const { Schema } = require('mongoose')
const util = require('./utils')

const BookSchema = new Schema({
  uuid: {
    type: String,
    unique: true
  },
  title: {
    type: String,
    unique: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  converted_at: {
    type: Date
  }
})

BookSchema.static('findOrCreate', function (book) {
  return this.findOne({ title: book.title })
    .then(data => {
      if (data) {
        return Promise.resolve(data)
      } else {
        return this.create({
          uuid: util.createUuid(32),
          title: book.title,
          author: book.author
        })
      }
    })
    .catch(err => {
      throw err
    })
})


BookSchema.static('converted', function (book) {
  return this.findOneAndUpdate({ _id: book._id }, {
    converted_at: Date.now()
  })
    .then(data => {
      return data
    })
    .catch(err => {
      throw err
    })
})

module.exports = BookSchema
