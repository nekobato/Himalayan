const mongoose = require('mongoose')
const databaseConfig = require('./config')

mongoose.connect(databaseConfig.production.database)
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

module.exports = {
  Admin: mongoose.model('Admin', require('./admin')),
  Book: mongoose.model('Book', require('./book')),
  Author: mongoose.model('Author', require('./author')),
  User: mongoose.model('User', require('./user'))
}
