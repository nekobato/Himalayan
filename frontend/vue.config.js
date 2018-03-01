const path = require('path')

module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        return [{ template: path.resolve('./public/index.html') }]
      })
  }
}
