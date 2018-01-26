const { Book } = require('./')
const util = require('./utils')

module.exports = {
  findOrCreate (book) {
    return Book.findOne({ title: book.title })
      .then(data => {
        if (data) {
          return Promise.resolve(data)
        } else {
          return create(book)
        }
      })
      .catch(err => {
        throw err
      })
  },
  find (option) {
    return Book.find(option)
  },
  converted (book) {
    return Book.findOneAndUpdate({ _id: book._id }, {
      converted_at: Date.now()
    })
      .then(data => {
        return data
      })
      .catch(err => {
        throw err
      })
  }
}

async function create (book) {
  return new Book({
    uuid: util.createUuid(32),
    title: book.title,
    author: book.author
  }).save()
}
