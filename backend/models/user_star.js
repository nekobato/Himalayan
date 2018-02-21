// UserがStarを付けたBookについて

const { Schema } = require('mongoose')

const UserStarSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  star: [{
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book'
    },
    time: {
      type: Number
    }
  }]
})

module.exports = UserStarSchema
