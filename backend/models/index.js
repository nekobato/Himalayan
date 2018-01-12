const mongoose = require('mongoose')
const databaseConfig = require('./config')

mongoose.connect(databaseConfig.production.database)
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

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
  }
})

const AuthorSchema = new Schema({
  uuid: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    unique: true
  },
  main_uuid: Number,
  created_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = {
  Book: mongoose.model('Book', BookSchema),
  Author: mongoose.model('Author', AuthorSchema)
}
