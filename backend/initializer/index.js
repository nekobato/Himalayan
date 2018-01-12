const dir = require('./directory')
const src = require('./book-src')
const image = require('./book-image')

module.exports = {
  async init () {
    this.isInitializing = true

    await dir.init()
    await src.init()
    await image.init()

    this.isInitializing = false

    return true
  },
  isInitializing: false
}
