const fs = require('fs-extra')
const path = require('path')
const {
  Book,
  Author
} = require('../models')
const config = require('../config')

function fileName2BookInfo(fileName) {
  let match = fileName.match(/^\[.*\]/)
  if (!match) {
    return {
      author: 'unknown',
      title: fileName
    }
  }
  return {
    author: match[0].replace(/\[|\]/g, ""),
    title: fileName.replace(/^\[.*\] /, "")
  }
}

async function numberingImages(oldDir, newDir) {
  function renameImage(file, index) {
    return new Promise((resolve, reject) => {
      // src/[hash] + *** + .[ext]
      const newFile = path.join(
        newDir,
        ('000' + index.toString()).slice(-3) + path.extname(file).toLowerCase()
      )

      if (fs.existsSync(newFile)) throw `${newFile} is already exists.`

      fs.rename(path.join(oldDir, file), newFile, (err) => {
        if (err) return reject(err)
        return resolve(newFile)
      })
    })
  }

  const files = await fs.readdir(oldDir)

  return Promise.all(files.map((file, index) => {
    if (/^\./.test(file)) return
    // 大文字でもｲｲﾖ!
    if (!/\.(jpg|png|jpeg)$/i.test(file)) return
    return renameImage(file, index)
  }))
}

module.exports = {
  async init() {

    let directories = fs.readdirSync(config.dir.raw)

    for (let directory of directories) {

      const bookRawDir = path.join(config.dir.raw, directory)

      // File Detail
      let fileStat = fs.statSync(bookRawDir)
      if (!fileStat.isDirectory()) continue

      let bookInfo = fileName2BookInfo(directory)

      if (!bookInfo || !bookInfo.author || !bookInfo.title) {
        console.log(`${directory}: name is not along the format [Author] Title.`)
        continue
      }

      console.log(`scanning: ${directory}`)

      // DB
      let author = await Author.findOrCreate({
        name: bookInfo.author
      })

      let existsBook = await Book.findOne({
        title: bookInfo.title
      })

      if (existsBook) {
        console.log(`${existsBook.title} (${existsBook.uuid}) is already exists. skipped.`)
        continue
      }

      let book = await Book.findOrCreate({
        title: bookInfo.title,
        author: author._id
      })

      const bookSrcDir = path.join(config.dir.src, book.uuid)

      // mkdir
      if (!fs.existsSync(bookSrcDir)) fs.mkdirSync(bookSrcDir)

      // Trans Files
      await numberingImages(bookRawDir, bookSrcDir)
    }

    return true
  }
}