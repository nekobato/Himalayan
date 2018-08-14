const path = require('path')

module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: 'http://localhost:3000'
  }
}
