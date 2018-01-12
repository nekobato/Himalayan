const fs = require('fs')
const config = require('../config')

function dirExists (dir) {
  if (!fs.existsSync(dir)) return false
  if (!fs.statSync(dir).isDirectory()) return false
  return true
}

module.exports = directory = {
  async init () {

    for (let dir in config.dir) {
      if (fs.existsSync(config.dir[dir])) continue
      fs.mkdirSync(config.dir[dir])
      if (!dirExists(config.dir[dir])) return Promise.reject(`Error: failed to make directory ${config.dir[dir]}`)
    }

    return true
  }
}
