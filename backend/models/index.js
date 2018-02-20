const mongoose = require('mongoose')
const debug = require('debug')('BookCafe:model')
const databaseConfig = require('./config')

mongoose.connect(databaseConfig.production.database).then(() => {
  debug('connected mongodb.')
}).catch(() => {
  debug('connect to mongodb is failed.')
})

mongoose.Promise = global.Promise
const Schema = mongoose.Schema

module.exports = {
  Admin: mongoose.model('Admin', require('./admin')),
  Book: mongoose.model('Book', require('./book')),
  Author: mongoose.model('Author', require('./author')),
  User: mongoose.model('User', require('./user'))
}
