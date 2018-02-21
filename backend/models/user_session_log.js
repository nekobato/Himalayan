// UserがSession内でBookを見たLogs

const { Schema } = require('mongoose')
const _ = require('lodash')

const UserSessionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  logs: [{
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book'
    },
    time: {
      // 秒数
      type: Number
    },
    page: {
      type: Number
    }
  }]
})

UserSessionSchema.static('concatLogs', function (logs) {
  this.log = _.concat(this.log, logs)
})

module.exports = UserSessionSchema
