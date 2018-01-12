const { Author } = require('./')
const util = require('./utils')

module.exports = {
  findOrCreate (author) {
    return Author.findOne({ name: author.name })
      .then(data => {
        if (data) {
          return data
        } else {
          return create(author)
        }
      })
  }
}

function create (author) {
  return new Author({
    uuid: util.createUuid(32),
    name: author.name,
    main_id: author.main_id || null
  }).save()
}
