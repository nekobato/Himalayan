const mongoose = require('mongoose')
const databaseConfig = require('./config')

mongoose.connect(databaseConfig.production.database)
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const AdminSchema = new Schema({
  is_converting: {
    type: Boolean,
    default: false
  }
})

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
  Admin: mongoose.model('Admin', AdminSchema),
  Book: mongoose.model('Book', BookSchema),
  Author: mongoose.model('Author', AuthorSchema)
}
