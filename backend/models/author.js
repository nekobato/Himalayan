const { Author } = require('./')
const util = require('./utils')

module.exports = {
  async findOrCreate (author) {
    return Author.findOne({ name: author.name })
      .then(data => {
        if (data) {
          return Promise.resolve(data)
        } else {
          return create(author)
        }
      })
  }
}

async function create (author) {
  return new Author({
    uuid: util.createUuid(32),
    name: author.name,
    main_id: author.main_id || null
  }).save()
}
