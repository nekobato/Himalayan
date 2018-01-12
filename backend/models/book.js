const { Book } = require('./')
const util = require('./utils')

module.exports = {
  async findOrCreate (book) {
    return Book.findOne({ title: book.title })
      .then(data => {
        if (data) {
          return Promise.resolve(data)
        } else {
          return create(book)
        }
      })
  },
  async find (option) {
    return Book.find(option)
  }
}

async function create (book) {
  return new Book({
    uuid: util.createUuid(32),
    title: book.title,
    author: book.author
  }).save()
}
